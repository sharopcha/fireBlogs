import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: 'Blog Crad #1',
        blogCoverPhoto: 'stock-1.jpg',
        blogData: 'First blog Content',
        blogDate: '12/02/2021',
      },
      {
        blogTitle: 'Blog Crad #2',
        blogCoverPhoto: 'stock-2.jpg',
        blogData: 'Second blog Content',
        blogDate: '22/03/2021',
      },
      {
        blogTitle: 'Blog Crad #3',
        blogCoverPhoto: 'stock-3.jpg',
        blogData: 'Third blog Content',
        blogDate: '1/04/2021',
      },
      {
        blogTitle: 'Blog Crad #4',
        blogCoverPhoto: 'stock-4.jpg',
        blogData: 'Fourth blog Content',
        blogDate: '8/06/2021',
      },
    ],
    blogPosts: [],
    postLoaded: null,
    editMode: false,
    user: null,
    isAdmin: null,
    profileEmail: '',
    profileLastName: '',
    profileFirstName: '',
    profileUsername: 'sharopcha',
    profileId: '',
    profileInitials: '',
    blogHTML: 'Write your blog title here...',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
  },

  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },

    blogPostCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },

  mutations: {
    toggleEditMode(state, payload) {
      state.editMode = payload;
    },

    togglePreviewModal(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    setAdmin(state, payload) {
      state.isAdmin = payload;
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },

    setProfileInitials(state) {
      if (state.profileFirstName !== '' && state.profileLastName !== '')
        state.profileInitials =
          state.profileFirstName.match(/(\b\S)?/g).join('') +
          state.profileLastName.match(/(\b\S)?/g).join('');
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    },

    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },

    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
  },

  actions: {
    async getCurrentUser({ commit }, user) {
      const database = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const res = await database.get();

      commit('setProfileInfo', res);
      commit('setProfileInitials');

      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setAdmin', admin);
    },

    async updateUserSettings({ commit, state }) {
      const database = db.collection('users').doc(state.profileId);
      await database.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });

      commit('setProfileInitials');
    },

    async getPosts({ state }) {
      const collection = await db
        .collection('blogPosts')
        .orderBy('date', 'desc');
      const results = await collection.get();
      results.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogId == doc.id)) {
          const data = {
            blogId: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().CoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
          };

          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
  },
  modules: {},
});

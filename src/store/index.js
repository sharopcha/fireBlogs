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
    editMode: false,
    editPost: null,
    user: null,
    profileEmail: '',
    profileLastName: '',
    profileFirstName: '',
    profileUsername: '',
    profileId: '',
    profileInitials: '',
  },
  mutations: {
    toggleEditMode(state, payload) {
      state.editMode = payload;
    },

    updateUser(state, payload) {
      state.user = payload;
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
  },
  actions: {
    async getCurrentUser({ commit }) {
      const database = await db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);
      const res = await database.get();
      commit('setProfileInfo', res);
      commit('setProfileInitials');
    },
  },
  modules: {},
});

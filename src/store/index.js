import Vue from 'vue';
import Vuex from 'vuex';

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
  },
  mutations: {
    toggleEditMode(state, payload) {
      state.editMode = payload;
    },
  },
  actions: {},
  modules: {},
});

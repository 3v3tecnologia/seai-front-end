export default {
  state:() => ({
    user: {
        email: "",
        type: "standard",
        modules: {
          jobs: {
            id: 1,
            read: false,
            write: false,
          },
          news: {
            id: 1,
            read: false,
            write: false,
          },
          register: {
            id: 1,
            read: false,
            write: false,
          },
          user: {
            id: 1,
            read: false,
            write: false,
          },
        },
      },
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
  },
};
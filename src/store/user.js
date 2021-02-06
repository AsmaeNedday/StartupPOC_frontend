import axios from 'axios';

export default {
    namespaced: true,
    state: {
       users:[]
    },
    getters: {
        GET_USERS(state) {
            return state.users;
        }
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
    },

    actions: {
        getUsers({ commit }) {
            return axios.get("/v1/users").then((res) => {
                commit("SET_USERS", res.data)
            });
        },

        async deleteUser( {dispatch}, idUser) {
              await axios.get(`/v1/users/disable/${idUser}`)
                .catch(function (error) {
                console.log(error);});
              return dispatch("getUsers");
        }
    }
}

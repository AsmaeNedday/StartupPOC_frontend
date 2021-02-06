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
            //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            return axios.get("/v1/users").then((res) => {
                commit("SET_USERS", res.data)
            });
        }
    }
}

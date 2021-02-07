import axios from 'axios';

export default {
    namespaced: true,
    state: {
        users: [],
        currentUser: {},
        usersOfManager: []
    },
    getters: {
        GET_USERS(state) {
            return state.users;
        },
        GET_CURRENT_USER(state) {
            return state.currentUser;
        },
        GET_USERS_OF_MANAGER(state) {
            return state.usersOfManager;
        },
        GET_MANAGERS(state) {
            return Array.from(new Set(state.users.map(obj => { return obj.manager; })
                .filter(obj => obj != null)));

        }
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_CURRENT_USER(state, currentUser) {
            state.currentUser = currentUser;
        },
        SET_USERS_OF_MANAGER(state, users) {
            state.usersOfManager = users;
        }
    },

    actions: {
        getUsers({ commit }) {
            return axios.get("/v1/users").then((res) => {
                commit("SET_USERS", res.data)
            });
        },
        getCurrentUser({ commit }, idUser) {
            return axios.get(`/v1/users/${idUser}`).then((res) => {
                commit("SET_CURRENT_USER", res.data)
            });
        },
        getUsersOfManager({ commit }, idManager) {
            return axios.get(`/v1/users/manager/${idManager}`).then((res) => {
                commit("SET_USERS_OF_MANAGER", res.data)
            });
        },
        async deleteUser({ dispatch }, idUser) {
            await axios.get(`/v1/users/disable/${idUser}`)
                .catch(function(error) {
                    console.log(error);
                });
            return dispatch("getUsers");
        }
    }
}
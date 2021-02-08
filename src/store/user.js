import axios from 'axios';

export default {
    namespaced: true,
    state: {
       users:[],
       currentUser :{},
    },
    getters: {
        GET_USERS(state) {
            return state.users;
        },
        GET_CURRENT_USER(state) {
            return state.currentUser;
        },
        GET_MANAGERS(state) {
            return state.users.filter(obj => obj.role.id==2);
        }
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_CURRENT_USER(state, currentUser) {
            state.currentUser = currentUser;
        },

    },

    actions: {
        getUsers({ commit }) {
            return axios.get("/v1/users").then((res) => {
                commit("SET_USERS", res.data)
            });
        },
        getCurrentUser({ commit }, idUser) {
            return axios.get(`/v1/users/${idUser}`).then((res) => {
                console.log(res);
                commit("SET_CURRENT_USER", res.data)
            });
        },

        async deleteUser( {dispatch}, idUser) {
              await axios.get(`/v1/users/disable/${idUser}`)
                .catch(function (error) {
                console.log(error);});
              return dispatch("getUsers");
        },
        async updateUser( {dispatch}, user) {
            await axios.post(`/v1/users/edit`, user )
                .catch(function (error) {
                    console.log(error);});
                 dispatch("getUsers");
                 return dispatch("getCurrentUser",user.userId);
        },
        async addUser( {dispatch}, user, id) {
            console.log("inside action");
            console.log(id);
            await axios.post(`/v1/users/create/${id}`, user )
                .catch(function (error) {
                    console.log(error);});
            return dispatch("getUsers");
        }
    }
}

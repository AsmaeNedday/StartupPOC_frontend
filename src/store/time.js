import axios from 'axios';

export default {
    namespaced: true,
    state: {
       times:[]
    },
    getters: {
        GET_TIMES(state) {
            return state.times;
        }
    },
    mutations: {
        SET_TIMES(state, times) {
            state.times = times;
        },
        DELETE_TIME(state, id){
            let index = state.times.findIndex(time => time.id == id)
            state.times.splice(index, 1)
        }
    },

    actions: {
        async getTimes({ commit }) {
            //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            const res = await axios.get("/v1/times");
            commit("SET_TIMES", res.data);
        },
        async createTime({dispatch},time){
            //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            let response = await axios.post("/v1/times", time);
            console.log(response);
            return dispatch("getTimes");
        },
        async deleteTime({dispatch}, id){
            //console.log("this is the id" + id)
            //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            let response = await axios.delete(`/v1/times/${id}`);
            console.log(response)
            //commit("DELETE_TIME", id)
            return dispatch("getTimes");
        }
    }
}
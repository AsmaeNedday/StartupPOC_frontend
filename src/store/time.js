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
        async generateMonthlyReport({ dispatch }, data) {
            let date = data.date;
            let id = data.userId;
            await axios.get(`/times/${id}/${date}/export/pdf`)
                .then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'file.pdf');
                document.body.appendChild(fileLink);

                fileLink.click();
            })
                .catch(function(error) {
                    console.log(error);
                });
            return dispatch("getTimes");
        }

    }
}
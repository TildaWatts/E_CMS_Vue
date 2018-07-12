const state = {
    counter: 1,
}

const getters = {
    doubleCounter: state=>{
        return state.counter *3;
    },
    stringCounter: state=>{
        return state.counter + 'clicks';
    },
}

const mutations = {
    increment: (state,payload)=> {
        console.log(payload);
        return state.counter += payload;
    },
    decrement: (state,payload)=> {
        return state.counter -= payload;
    },
}

const actions = {
    increment:({commit},payload)=>{
        commit('increment',payload);
    },
    decrement:({commit},payload)=>{
        commit('decrement',payload);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings:
    {
      starttime: undefined,
      lang:undefined
    }
  },
  getters:{
    savedSettings:(state) =>{  // eslint-disable-line no-unused-vars
      return state.settings;
    }
  },
  mutations: {
    saveSettings:(state, payLoad) =>{  // eslint-disable-line no-unused-vars
      state.settings = payLoad;
    }
  },
  actions: {
    saveSettings:({commit}, payLoad) =>{  // eslint-disable-line no-unused-vars
      commit('saveSettings', payLoad); 
    }
  },
  modules: {
  }
})

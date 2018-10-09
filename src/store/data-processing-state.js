
const dataProcessingState = {
  state: {
    lastActiveId:Number,
  },
  getters: {
    lastActiveDataSetId: state => {
      return state.lastActiveId;
    }
  },
  mutations: {
    changeDataProcessingActiveDataSetId(state, payload) {
      state.lastActiveId = payload.dataSetId;
    }
  }
}
export default dataProcessingState;
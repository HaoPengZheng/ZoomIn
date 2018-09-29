const menuActiveIndex = {
  dataImport: "/home/data-import",
  dataProcessing: "/home/data-processing",
  dataAnalysis:"/home/data-analysis",
  dataMining:"/home/data-mining",
  taskRelease:"/home/task-release",
};
const homeMenu = {
  state: {
    active: "dataImport"
  },
  getters: {
    activeIndex: state => {
      let activeIndex = menuActiveIndex[state.active];
      if(activeIndex==""||activeIndex==undefined){
        activeIndex = menuActiveIndex["dataImport"]
      }
      return activeIndex;
    }
  },
  mutations: {
    changeIndex(state, payload) {
      state.active = payload.index;
    }
  }
}
export default homeMenu;
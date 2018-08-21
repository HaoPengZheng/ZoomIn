let UIUtils ={
  showTypesUi: function(type) {
    if (type == "T") {
      return "#icon-wenzi";
    }
    if (type == "#") {
      return "#icon-shuzi";
    }
    if(type == "d"){
      return "#icon-icon-time"
    }
  }
}

export default UIUtils;
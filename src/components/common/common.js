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

export const TYPECONVERTER = {
  converterSymbolToType:function(symbol){
    let type = "";
    if(symbol == "T"){
      type = "object"
    }else if (symbol == 'd'){
      type = "datetime64[ns]";
    }else{
      type = "float64";
    }
    return type;
  },
  converterTypeToMssage:function(type){
    let symbol = "";
    if (type == "'object'") {
      symbol = "T";
    } else if (type == "datetime64[ns]") {
      symbol = "d";
    } else {
      symbol = "#";
    }
    return symbol;
  }
}
export default UIUtils;
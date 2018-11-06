const validateObj = {
  validateName: (rule, value, callback) => {
    if (value == "" || typeof value == "undefined") {
      callback(new Error("任务名不能为空！"));
    } else {
      if (value.length > 15) {
        callback(new Error("任务名不能超过15个字符！"));
      }
      callback();
    }
  },
  validateTitle: (rule, value, callback) => {
    if (value == "" || typeof value == "undefined") {
      callback(new Error("数据集名不能为空！"));
    } else {
      if (value.length > 15) {
        callback(new Error("数据集名不能超过15个字符！"));
      }
      callback();
    }
  },
  validateNoNullOrUndefined: (rule, value, callback) => {
    if (value == "" || typeof value == "undefined"||value == null) {
      callback(new Error("该项不能为空！"));
    } else {
      callback();
    }
  }
}
export default validateObj;
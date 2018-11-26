<template>
  <el-form ref="addFieldForm">
    <el-form-item>
      <el-input v-model="newFieldName" placeholder="字段名称"></el-input>
    </el-form-item>
    <el-form-item>
      <type-select v-model="newFieldType" style="width:100%;" :placeholder="`请选择字段类型`"></type-select>
    </el-form-item>
    <el-form-item>
      <el-input type="textarea" :rows="2" placeholder="根据下面函数提示编写expression" v-model="expression" resize="none">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-row class="tac">
        <el-col :span="12">
          <h5 style="text-align:center">函数</h5>
          <vue-scroll :ops="ops">
            <div class='chooseFun'>
              <el-menu style="max-height:200px;border:0px" class="el-menu-vertical-demo">
                <el-menu-item index="1" v-for="(expression,index) in expressions" :key="index">
                  <span slot="title">
                    <el-tooltip placement="left">
                      <div slot="content" style="font-size:16px">{{expression.affect}}<br />{{expression.example}}</div>
                      <a style="" type="text" @click="addFunction(`${expression.name}`)">
                        <i class="el-icon-menu"></i>{{expression.name}}
                      </a>
                    </el-tooltip>
                  </span>
                </el-menu-item>
              </el-menu>
            </div>
          </vue-scroll>
        </el-col>
        <el-col :span="12">
          <h5 style="text-align:center">字段</h5>
          <vue-scroll :ops="ops">
            <div class='your-content'>
              <el-menu style="max-height:200px;border:0px" class="el-menu-vertical-demo">
                <el-menu-item :index="index.toString()" v-for="(field,index) in fields " :key="index">
                  <span slot="title">
                    <a @click="chooseField(field)">
                      <svg class="icon" aria-hidden="true" style="margin-right:20px">
                        <use :xlink:href="$utils.showTypesUi(types[index])"></use>
                      </svg>
                      {{field}}
                    </a>
                  </span>
                </el-menu-item>
              </el-menu>
            </div>
          </vue-scroll>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
import TypeSelect from "../common/TypeSelect.vue";

const exampleLable = "例子：";
const affectLable = "作用：";
const expressions = [
  {
    name: "Expression",
    affect: `${affectLable}四则运算`,
    example: `${exampleLable}Expression('__EMPTY+__EMPTY')`
  },
  {
    name: "Layer_average1",
    affect: `${affectLable}根据某一分层列，生成平均值,layer_name为指定的分层列，C_name为以相对应的分层列求均值的列 `,
    example: `${exampleLable}Layer_average1('layer_name', 'C_name')`
  },
  {
    name: "Layer",
    affect: `${affectLable}layers为层数，实现分层，并生成每个学生所在的层列 `,
    example: `${exampleLable}Layer(layers, 'C_name')`
  },
  {
    name: "Rank",
    affect: `${affectLable}生成排名 `,
    example: `${exampleLable} Rank('C_name') `
  },
  {
    name:"Rankit",
    affect:`${affectLable}生成Rankit,C_name为列名 `,
    example:`${exampleLable} Rankit(C_name) `,
  },
];
// <el-menu-item index="1">
//                   <span slot="title">
//                     <el-tooltip placement="left">
//                       <div slot="content" style="font-size:16px">expression:a+b<br />作用:相加<br />例子:语文+数学+...</div>
//                       <el-button type="text">
//                         <i class="el-icon-menu"></i>ADD
//                       </el-button>
//                     </el-tooltip>
//                   </span>
//                 </el-menu-item>
export default {
  components: {
    TypeSelect
  },
  data() {
    return {
      expression: "",
      newFieldType: "",
      newFieldName: "",
      ops: {
        vuescroll: {},
        scrollPanel: {},
        scrollContent: {}, // only for native-mode
        rail: {
          background: "#eee",
          opacity: 1,
          /** Rail's size(Height/Width) , default -> 6px */
          size: "6px"
        },
        bar: {
          onlyShowBarOnScroll: false,
          background: "#90929880"
        }
      },
      expressions: expressions
    };
  },
  props: {
    fields: Array,
    types: Array,
    dataSetId: ""
  },
  methods: {
    chooseField: function(field) {
      this.expression = this.expression + `${field}`.trim();
    },
    chooseFunction: function(fun) {
      this.expression = this.expression + `${fun}()`.trim();
    },
    addFunction: function(name) {
      this.expression = this.expression + `${name}`.trim();
    },
    addField: function() {
      let that = this;
      if (typeof this.dataSetId == "number") {
        
      }
      this.$post("/task/dataProcessing/zoomin_eval", {
        data_set_id: this.dataSetId,
        newColumnName: this.newFieldName,
        function: this.expression
      }).then(response => {
        if (response.message == "表达式错误") {
          that.$message({
            message: "表达式错误",
            type: "warning",
            duration: 1500
          });
        } else {
          this.$emit("refreshData");
        }
      });
    }
  }
};
</script>
<style  scoped>
</style>


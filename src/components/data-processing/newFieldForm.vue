<template>
  <el-form ref="addFieldForm">
    <el-form-item>
      <el-input v-model="newFieldName" placeholder="字段名称"></el-input>
    </el-form-item>
    <el-form-item>
      <typeSelect v-model="newFieldType" style="width:100%;" :placeholder="`请选择字段类型`"></typeSelect>
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
              <el-menu  style="max-height:200px;border:0px" class="el-menu-vertical-demo">
                <el-menu-item index="1">
                  <span slot="title">
                    <el-tooltip placement="left">
                      <div slot="content" style="font-size:16px">expression:a+b<br />作用:相加<br />例子:语文+数学+...</div>
                      <el-button type="text">
                        <i class="el-icon-menu"></i>ADD
                      </el-button>
                    </el-tooltip>
                  </span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span slot="title" >
                    <el-tooltip placement="left">
                      <div slot="content" style="font-size:16px">expression:a-b<br />作用:相减<br />例子:总成绩-数学</div>
                      <el-button type="text">
                        <i class="el-icon-menu"></i>SUB
                      </el-button>
                    </el-tooltip>
                  </span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span slot="title" >
                    <el-tooltip placement="left">
                      <div slot="content" style="font-size:16px">expression:a*b<br />作用:相乘<br />例子:平均分*3</div>
                      <el-button type="text">
                        <i class="el-icon-menu"></i>MUL
                      </el-button>
                    </el-tooltip>
                  </span>
                </el-menu-item>
                     <el-menu-item index="4">
                  <span slot="title" >
                    <el-tooltip placement="left">
                      <div slot="content" style="font-size:16px">expression:a/b<br />作用:相除<br />例子:数学/总成绩</div>
                      <el-button type="text">
                        <i class="el-icon-menu"></i>DEV
                      </el-button>
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
              <el-menu  style="max-height:200px;border:0px" class="el-menu-vertical-demo">
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
import typeSelect from "../common/typeSelect.vue";
export default {
  components: {
    typeSelect
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
      }
    };
  },
  props: {
    fields: Array,
    types: Array,
    dataSetId:"",
  },
  methods: {
    chooseField: function(field) {
      this.expression = this.expression + `${field}`.trim();
    },
    chooseFunction: function(fun) {
      this.expression = this.expression + `${fun}()`.trim();
    },
    addField:function(){
      if(typeof this.dataSetId == 'number'){
        alert("number");
      }
      this.$post('/task/dataProcessing/Expression',{
        data_set_id:this.dataSetId,
        newColumnName:this.newFieldName,
        expression:this.expression
      }).then(()=>{
         alert("number");
        this.$emit('refreshData');
      })
    }
  }
};
</script>

<style  scoped>
</style>


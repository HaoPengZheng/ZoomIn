<template>
  <div>
    <el-dialog title="辅助线设置" :visible.sync="dialogTableVisible" style="border-radius:15px">
      <div v-for="(item,index) in rowArray" :key="index">
        <mark-line-item :selectOptions="selectOptions" @changeMsg="rowItemEvent" class="markLineStyle"></mark-line-item>
      </div>
      <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensure">确 定</el-button>
                </span>

    </el-dialog>

    <el-button @click="dialogPop" style="width:100%">辅助线设置
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bi1"></use>
      </svg>
    </el-button>
  </div>
</template>

<script>
  import Bus from './Bus.js'
  import markLineItem from './markLineItem'

  export default {
    data() {
      return {
        input: '',
        yData: [],
        selectOptions: [],
        selectValue: [],
        selectType: ['固定值', '计算值'],
        selectTypeValue: '固定值',
        selectCalculateType: ['平均值', '最大值', '最小值'],
        selectCalculateTypeValue: '平均值',
        dialogTableVisible: false,
        selectCalculateVisible: false,
        inputVisiable: true,
        iconVisiable: true,
        inputValue: 0,
        rowArray: [1]
      }
    },
    components: {
      markLineItem
    },
    mounted() {
      Bus.$on('featureConfiguration', (e) => {
        this.yData.push(e);
        this.selectOptions.push({
          value: e,
          label: e
        })
      })
    },
    watch: {
      selectTypeValue(val) {
        if (val == '计算值') {
          this.selectCalculateVisible = true;
          this.inputVisiable = false
        }
        else if (val == '固定值') {
          this.inputVisiable = true;
          this.selectCalculateVisible = false
        }
        else {
        }
      }
    },
    computed: {
      featureValueObject() {
        return {
          "selectValue": this.selectValue,
          "selectTypeValue": this.selectTypeValue,
          "selectCalculateTypeValue": this.selectCalculateTypeValue,
          "inputValue": this.inputValue
        }
      }
    },
    methods: {
      ensure() {
        Bus.$emit('ensure', true);
        this.dialogTableVisible = false
      },
      dialogPop() {
        this.dialogTableVisible = true
      },
      rowItemEvent(e) {
        if (e == '加行') this.rowArray.push(1)
        if (e == '减行') this.rowArray.pop()
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .TitleStyle {
    margin-left: 5px;
  }

  .selectBox {
    margin: 2px
  }

  .markLineStyle {
    margin-top: 3px
  }
</style>

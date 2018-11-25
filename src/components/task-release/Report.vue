<template>
  <vue-scroll :ops="ops">
    <div style="min-height:300px;max-height:400px;padding-right:40px;">
      <h1 class="center">{{taskInfo.taskName}}</h1>
      <el-form label-width="120px">
        <div>
          <span class="small-title">
            1.基础信息
          </span>
          <br>
          <p class="pad-20">
            <el-form-item label="编辑者:">
              <el-input v-model="report.baseInfo.editor" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间:">
              <el-input v-model="report.baseInfo.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="所用数据源:">
              <el-input v-model="report.baseInfo.dataSet" disabled></el-input>
            </el-form-item>
          </p>
        </div>
        <div>
          <span class="small-title">
            2.数据分析
          </span>
          <br>
          <div class="report-pic">
            <img v-for="(pic,index) in dataAnalysisPic" :key="index" :src="`data:iamge/jpeg;base64,${pic}`" />
          </div>
          <p class="pad-20">
            <el-form-item label="数据分析结论：">
              <el-input type="textarea" v-model="report.dataAnalysis.conclusion" rows="4"></el-input>
            </el-form-item>
          </p>
        </div>
        <div>
          <span class="small-title">
            3.数据挖掘
          </span>
          <br>
          <div class="report-pic">
            <img v-for="(pic,index) in dataMiningPic" :key="index" :src="`data:iamge/jpeg;base64,${pic}`" />
          </div>
          <p class="pad-20">
            <el-form-item label="数据挖掘结论:">
              <el-input type="textarea" v-model="report.dataMining.conclusion" rows="4"></el-input>
            </el-form-item>
          </p>
        </div>
        <div>
          <span class="small-title">
            4.总结
          </span>
          <p class="pad-20">
            <el-form-item label="最后总结：">
              <el-input type="textarea" v-model="report.summary.conclusion" rows="4"></el-input>
            </el-form-item>
          </p>
        </div>
      </el-form>
    </div>
  </vue-scroll>
</template>
<script>
import { Packer, Image } from "docx";
import { saveAs } from "file-saver";
import { DocumentCreator } from "./generator.ts";
import cheerio from "cheerio";
import ops from "@/utils/scrollOption.js";
export default {
  data() {
    return {
      ops: ops,
      report: {
        baseInfo: {
          taskName:this.taskInfo.taskName,
          editor: this.data.user_name,
          createTime: this.data.add_time,
          dataSet: "1.csv"
        },
        dataAnalysis: {
          img:[],
          conclusion: this.data.dataAnalye_Summary==undefined?"":this.data.dataAnalye_Summary
        },
        dataMining: {
          img:[],
          conclusion: this.data.dataMinging_Summary==undefined?"":this.data.dataMinging_Summary
        },
        summary: {
          conclusion: this.data.total_Summary==undefined?"":this.data.total_Summary
        }
      }
    };
  },
  props: {
    taskInfo:"",
    data:"",
    dataAnalysisPic: "",
    dataMiningPic: ""
  },
  watch:{
    data:function(val,newVal){
      this.report.baseInfo.editor = this.data.user_name;
      this.report.baseInfo.createTime = this.data.add_time;
    }
  },
  methods: {
    generateHtml: function() {
      let html = '<html><head><title>XX任务</title><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><style>    .label {      color:#000;      font-weight: 600;    }    .base-item {      margin: 5px 0;    }    ul{      list-style:none;    }    img{      width:800px;    }</style></head><body style="font-size:20px;"><div class="panel panel-default"><div class="panel-heading"><h1 id="taskName" style="text-align:center">学业分析报告（任务名称）</h1></div><div class="panel-body"><div style="margin:0 auto;max-width:800px;"><div><h3>基本信息:</h3><div style="padding-left:50px;"><div class="base-item"><span class="label">编辑者：</span><span id="editor">zhp</span></div><div class="base-item"><span class="label">创建时间:</span><span id="createTime">zhp</span></div><div class="base-item"><span class="label">所用数据源</span><span id="dataSet">zhp</span></div></div></div><div><h3>数据分析:</h3><div style="padding-left:50px;"><ul id="data-analysis-pic"></ul><div class="base-item"><span class="label">数据分析结论：</span><span id="dataAnalysisConclusion">zhp</span></div></div></div><div><h3>数据挖掘:</h3><div style="padding-left:50px;"><ul id="data-mining-pic"></ul><div class="base-item"><span class="label">数据挖掘结论：</span><span id="dataMiningConclusion">zhp</span></div></div></div><div><h3>总结:</h3><div style="padding-left:50px;"><div class="base-item"><span class="label">总结：</span><span id="summaryConclusion">zhp</span></div></div></div></div></div></div></body></html>'
      let $ = cheerio.load(html);
      $("title").html(this.report.baseInfo.taskName);
      $("#taskName").html(this.report.baseInfo.taskName);
      $("#editor").html(this.report.baseInfo.editor);
      $("#createTime").html(this.report.baseInfo.createTime);
      $("#dataSet").html(this.report.baseInfo.dataSet);
      for(let i = 0 ; i < this.dataAnalysisPic.length;i++){
        $("#data-analysis-pic").append(`<li><img src='data:iamge/jpeg;base64,${this.dataAnalysisPic[i]}'/></li>`)
      }
      $("#dataAnalysisConclusion").html(this.report.dataAnalysis.conclusion);
      for(let i = 0 ; i < this.dataMiningPic.length;i++){
        $("#data-mining-pic").append(`<li><img src='data:iamge/jpeg;base64,${this.dataMiningPic[i]}'/></li>`)
      }
      $("#dataMiningConclusion").html(this.report.dataMining.conclusion);
      $("#summaryConclusion").html(this.report.summary.conclusion);
      console.log($.html());
      var eleLink = document.createElement("a");
      eleLink.download = "text.html";
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([$.html()]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    generateWord: function() {
      const documentCreator = new DocumentCreator();
      this.report.dataAnalysis.img = this.dataAnalysisPic;
      this.report.dataMining.img = this.dataMiningPic;
      const doc = documentCreator.create(this.report);
      const packer = new Packer();
      packer.toBlob(doc).then(blob => {
        saveAs(blob, "报告.docx");
        console.log("Document created successfully");
      });
    },
    postSummary:function(taskid){
         this.$post("/summary/",{
        task:taskid,
        dataAnalyze_Summary:this.report.dataAnalysis.conclusion,
        dataMining_Summary:this.report.dataMining.conclusion,
        total_Summary:this.report.summary.conclusion
      })
    }
  }
};
</script>
<style scoped>
.center {
  text-align: center;
}
.small-title {
  font-weight: 600;
}
.pad-20 {
  padding-left: 20px;
}
.pre-report {
  padding: 0 40px;
}
.report-pic {
  width: 100%;
}
.report-pic img {
  width: 100%;
  height: 100%;
}
</style>

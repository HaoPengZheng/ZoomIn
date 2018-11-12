<template>
  <vue-scroll :ops="ops">
    <div style="min-height:300px;max-height:400px;padding-right:40px;">
      <h1 class="center">学业分析报告（任务名称）</h1>
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
            <img v-for="pic in dataAnalysisPic" :key="pic.id" :src="pic.name" />
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
            <img v-for="pic in dataAnalysisPic" :key="pic.id" :src="pic.name" />
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
import image2base64 from "image-to-base64";
import ops from "@/utils/scrollOption.js";
export default {
  data() {
    return {
      ops: ops,
      report: {
        baseInfo: {
          editor: "zhp",
          createTime: "2018-11-8",
          dataSet: "1.csv"
        },
        dataAnalysis: {
          conclusion: "数据分析结论:"
        },
        dataMining: {
          conclusion: "数据挖掘结论:"
        },
        summary: {
          conclusion: "4.总结"
        }
      }
    };
  },
  props: {
    dataAnalysisPic: Array,
    dataMiningPic: Array
  },
  methods: {
    generateWord: function() {
      var url =
        "http://120.79.146.91:8000/home/ZoomInDataSet/2/Publish/4413591.png";
      image2base64(url) // you can also to use url
        .then(response => {
          console.log(response); //cGF0aC90by9maWxlLmpwZw==
        })
        .catch(error => {
          console.log(error); //Exepection error....
        });
      const documentCreator = new DocumentCreator();
      const doc = documentCreator.create(this.report);
      const packer = new Packer();
      packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "报告.docx");
        console.log("Document created successfully");
      });
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

import { Document, Paragraph, Packer, TextRun, PictureRun, ImageParagraph} from "docx";
import { Buffer } from "buffer";
export class DocumentCreator {
  create(data) {
    console.log(data);
    let defaultInfo={
      header:{
        text:"本文档使用ZoomIn系统生成"
      },
      baseInfo:{
        text:"1.基础信息",
        editorLabel:"编辑者：",
        createTimeLabel:"创建时间：",
        dataSetLabel:"所用数据源:"
      },
      dataAnalysis:{
        text:"2.数据分析",
        conclusionLabel:"数据分析结论:"
      },
      dataMining:{
        text:"3.数据挖掘",
        conclusionLabel:"数据挖掘结论:"
      },
      summary:{
        text:"4.总结"
      }
    }
    let d = {
      taskName:"学业分析报告（任务名称）"
    }
    const document = new Document();
    document.Header.createParagraph(defaultInfo.header.text).center();
    document.createParagraph(d.taskName).title().center();
    document.createParagraph(defaultInfo.baseInfo.text).heading2();
    var editorLabel = new TextRun(defaultInfo.baseInfo.editorLabel).bold();
    var editor = new TextRun(data.baseInfo.editor);
    var createTimeLabel = new TextRun(defaultInfo.baseInfo.createTimeLabel).bold();
    var createTime = new TextRun(data.baseInfo.createTime);
    var dataSetLabel = new TextRun(defaultInfo.baseInfo.dataSetLabel).bold();
    var dataSet = new TextRun(data.baseInfo.dataSet);
    document.createParagraph().addRun(editorLabel).addRun(editor);
    document.createParagraph().addRun(createTimeLabel).addRun(createTime);
    document.createParagraph().addRun(dataSetLabel).addRun(dataSet);

    document.createParagraph(defaultInfo.dataAnalysis.text).heading2();
    
    var dataAnalysisconclusionLabel = new TextRun(defaultInfo.dataAnalysis.conclusionLabel).bold();
    var dataAnalysisconclusion = new TextRun(data.dataAnalysis.conclusion);
    document.createParagraph().addRun(dataAnalysisconclusionLabel).addRun(dataAnalysisconclusion);

    document.createParagraph(defaultInfo.dataMining.text).heading2();
    var dataMiningconclusionLabel = new TextRun(defaultInfo.dataMining.conclusionLabel).bold();
    var dataMiningconclusion = new TextRun(data.dataMining.conclusion);
    document.createParagraph().addRun(dataMiningconclusionLabel).addRun(dataMiningconclusion);
    
    var summaryconclusion = new TextRun(data.summary.conclusion);
    document.createParagraph(defaultInfo.summary.text).heading2();
    document.createParagraph().addRun(summaryconclusion);
    return document;
  }

  createDataAnalysisPic(dataAnalysisInfo){
    
  }
}
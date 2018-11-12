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
    var base = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8NJREFUeNrEV0tv00AQnnXSltIC/4JKMVfO3FA5cEgQBaTyFPSA4FBRaAWqBBVVgyAHblWpKCqcOCRSTjnCjR9QR+JnAA1KbO8O364d8qid2k2krjReyzuPb2dmZ9aCmek4Rzbqoyh9jvioSczieYGYLxOT3bdex3oVb995cb6WFICI8oAofTpo2LJKmHOk+aUizPWQgw2XXstYmlevOaTUEi/erh0NwJud8AXKMlaZLJE3hpkqULyF9xqFYrx8tyP39pMGugA4eSOruMJPbhUGAbAiv3JIFowTjEvs1leXyJMFvNdIdfF0iz29UzMGNa+EFyAr3u2W0wOQPrTJWVIyT75XJ9edI8+rme/9FIX/2Z0aZK4ZWegQG9uzKQHoOFMJOyZyJYxLB7uiSIoZ/Py+E8pqXe/SASAFxCpHUr7BLh1inXQxNGDw6gMHOorQZYu1zdnkAHx/AS7H7H3GOw2kw4bvfQl0QWdiAJ6agfvqmONdf0gI/nth7ZET6ppJXIjgthye9ZGVOyn1M5ccgC9HW28H6IvxgF/vqQlDe8DkSj15Dij+CcM5zLZB36EyyOn51l1BH647oJ7CIx5v2KGun2lOwQeUXB27myZ+nayfCedy/ykQC6/0Nwad7Yv/vNHl+1vJe8GDl+gBmT3UcxuN5xwUOF3Le2GLis767Zd2B9SajV6ypxsXb67aKY4hduZ6S2b3rL72eeEcqBpRE6rdxgM0oazWlaobzq8EnTCbQSe08qa9ejB8kNfEm78UD3Q8cW/VMS1aqQrvvC6kOwXtAiO58B+EsBi7ESaeh/X4Wy8YMkhmWeHd9SO047ZbXZeo2SpgRlfD7pUq9oXjQDkW159tGF7IHGZ8AADukAuDTX/O3IKEtUwKidm97nfCIq4s2eBZMR5s+leTlIjBHmiT5znUcovG/azmjReUDK9rPUkXHDnXLXK5VB8lAK006GqCVmgsY9P4GNGJ8YA0jsKibdbavENdSi9GdE59Kk6eYDo1TTQxRibJ9KxHyyOzcz3/2SeuvBdDXcu749pzUVQaxCTRmWl9RHWx6nQ7XZZ/7YMaw/8XxF40dNwzADEGw9ksmWu4CaQIckGvKTkCAHF/S6amy6BOZFTgkSD5wguKpCR14uj3ARdtutHM0dRksGOLO57RNaPRDHiG90BMCNxmlRr7OfoFsdNTQR60Af9G7Bv7AU+KEX0Kzt+IObSI+eQEmyScOtl7Chp/TRLyt49iBCGIuwbp+DcFqlyZJhp5A6idGy2vwj92C5RyiOP+Pf8nwABYVZBTsauaWgAAAABJRU5ErkJggg==";
    document.createImage(base,100,100);
    
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
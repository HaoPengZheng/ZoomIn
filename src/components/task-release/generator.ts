import { Document, Paragraph, Packer, TextRun} from "docx";
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

  createContactInfo(phoneNumber, profileUrl, email) {
    const paragraph = new Paragraph().center();
    const contactInfo = new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`);
    const address = new TextRun("Address: 58 Elm Avenue, Kent ME4 6ER, UK").break();

    paragraph.addRun(contactInfo);
    paragraph.addRun(address);

    return paragraph;
  }

  createHeading(text) {
    return new Paragraph(text).heading1().thematicBreak();
  }

  createSubHeading(text) {
    return new Paragraph(text).heading2();
  }

  createInstitutionHeader(institutionName, dateText) {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).bold();
    const date = new TextRun(dateText).tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);

    return paragraph;
  }

  createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).italic();

    paragraph.addRun(role);

    return paragraph;
  }

  createBullet(text) {
    return new Paragraph(text).bullet();
  }

  createSkillList(skills) {
    const paragraph = new Paragraph();
    const skillConcat = skills.map((skill) => skill.name).join(", ") + ".";

    paragraph.addRun(new TextRun(skillConcat));

    return paragraph;
  }

  createAchivementsList(achivements) {
    const arr = [];

    for (const achievement of achivements) {
      arr.push(new Paragraph(achievement.name).bullet());
    }

    return arr;
  }

  createInterests(interests) {
    const paragraph = new Paragraph();

    paragraph.addRun(new TextRun(interests));
    return paragraph;
  }

  splitParagraphIntoBullets(text) {
    return text.split("\n\n");
  }

  createPositionDateText(startDate, endDate, isCurrent) {
    const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  getMonthFromInt(value) {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }
}
<template>
    <div>
        <div class="application-header-box">
            <div class="application-header ">新建任务</div>
        </div>
        <el-button type="text" @click="newTaskDialogVisable = true">点击新建任务</el-button> 
        <el-dialog
            :visible.sync="newTaskDialogVisable"
            width="30%"
            title="新建任务"
            center>
            <el-form ref="form" label-width="80px" label-position="left">
                <el-form-item label="任务名称">
                    <el-input type="text" v-model="newTaskModel.name"></el-input>
                </el-form-item>
                <el-form-item label="任务描述">
                    <input type="file" ref="obj" @change="importf()" id="excel-input"
                                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newTaskDialogVisable = false">取 消</el-button>
                <el-button type="primary" @click="newTask">下一步</el-button>
            </span>
        </el-dialog>   
        <el-dialog
            :visible.sync="tablePreviewVisable"
            width="50%"
            title="数据预览"
            top="5vh"
            >
           <previewTable :json="tablejsons" v-on:setTitleIndex="setTitleIndex"></previewTable>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tablePreviewVisable = false">取 消</el-button>
                <el-button type="primary" @click="createTask">创建任务</el-button>
            </span>
        </el-dialog> 
    </div>
  
</template>
<script>
import XLSX from 'xlsx'
import previewTable from './prviewTable.vue'
let wb; //读取完成的数据
let rABS = false; //是否将文件读取为二进制字符串
let filename;
export default {
    components:{
        previewTable,
    },
    data(){
        return{
            newTaskDialogVisable:false,
            tablePreviewVisable:false,
            newTaskModel:{
                name:"",
                describe:"",
                file:""
            },
            tablejsons:null,
            titleIndex:1
        }
    },
    methods:{
        newTask:function(){
            this.tablePreviewVisable = true;
            this.newTaskDialogVisable = false;
            
        },

        importf() { //导入
            let obj  = this.$refs.obj
            filename = obj.value.substring(obj.value.lastIndexOf("\\") + 1, obj.value.lastIndexOf("."));
            if (!obj.files) {
                return;
            }
            var f = obj.files[0];
            var reader = new FileReader();
            let _this = this;
            reader.onload = function (e) {
                var data = e.target.result;
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(data)), { //手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(data, {
                        type: 'binary'
                    });
                }
                //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                //wb.Sheets[Sheet名]获取第一个Sheet的数据
                var jsons = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
                console.log(jsons)
                _this.tablejsons=JSON.parse(jsons)
            };
       
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
           
        },
        fixdata(data) { //文件流转BinaryString
            var o = "",
                l = 0,
                w = 10240;
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
            return o;
        },
        setTitleIndex:function(index){
            this.titleIndex = index;
        },
        createTask:function(){
            this.tablePreviewVisable = false;
            alert("{'title':'"+this.titleIndex+",'name:'"+this.newTaskModel.name+",'json:'"+JSON.stringify(this.tablejsons)+"}");
        }
    }
}
</script>
<style>
.el-main{
   line-height: 40px;
}
.application-header-box {
    border-bottom: 1px solid #979797;
    padding-top: 0;
    display: block;
    height: 40px;
    margin: 20px 100px;

}

.application-header {
    border-bottom: 2px solid #00c587;
    line-height: 38px;
    font-size: 24px;
    margin-left: 60px;
    text-align: left;
    float: left;
}
</style>



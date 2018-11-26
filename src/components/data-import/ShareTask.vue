<template>
  <div>
    <div class="application-header-box">
      <div class="application-header ">分享任务</div>
      <!-- 搜索框 -->
      <div style="">
        <!-- element的远程搜索示例 -->
        <el-select v-model="value9" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <el-row :gutter="30">
      <el-col :xs="8" :sm="8" :md="8" :lg="5" :offset="2">
        <img src="../../assets/data-import/excel.png" @click="showNewTaskDialog('excel')" class="input-img" ondragstart="return false;">
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="5">
        <img src="../../assets/data-import/csv.png" @click="showNewTaskDialog('csv')" class="input-img" ondragstart="return false;">
      </el-col>

    </el-row>
  </div>

</template>
<script>
export default {
  data() {
    return {
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    }
  }
};
</script>



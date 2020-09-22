<template>
  <div id="cdn">
    <div id="target">
      <el-row>
        <el-col id="input">
          <div>
            <el-input ref="inputName" v-model="inputinfo" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col id="rightbtn">
          <div>
            <el-button type="primary" @click="startTarget">开始</el-button>
          </div>
        </el-col>
        <el-col id="rightbtn">
          <div>
            <el-button @click="startStop">停止</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="content">
      <p>扫描结果</p>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="ip" label="IP" width="180"></el-table-column>
          <el-table-column prop="cname" label="CName"></el-table-column>
          <el-table-column prop="cdncompany" label="CDN厂商"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
var _data = {
  msg: true,
  title: "hello vue js",
  reversemsg: "Hello",
  primary: "primary",
  inputinfo: "",
  tableData: [
    {
      ip: "2016-05-02",
      cname: "王小虎",
      cdncompany: "上海市普陀区金沙江路 1518 弄",
    },
    {
      ip: "2016-05-04",
      cname: "王小虎",
      cdncompany: "上海市普陀区金沙江路 1517 弄",
    },
    {
      ip: "2016-05-01",
      cname: "王小虎",
      cdncompany: "上海市普陀区金沙江路 1519 弄",
    },
    {
      ip: "2016-05-03",
      cname: "王小虎",
      cdncompany: "上海市普陀区金沙江路 1516 弄",
    },
  ],
};


//postData('data to process');
function postData(input) {
  $.ajax({
    type: "POST",
    url: "/reverse_pca.py",
    data: { param: input },
    success: callbackFunc
  });
}
function callbackFunc(response) {
  // do something with the response
  console.log(response);
}

export default {
  data() {
    return _data
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputName.focus();
    });
  },
  methods: {
    startTarget() {
      let inputinfo = this.inputinfo;
      this.$notify({
        title: inputinfo,
        type: "success",
        message:
          "We've laid the ground work for you. It's time for you to build something epic!",
        duration: 5000,
      });
    },
  },
};
</script>

<style scoped>
#cdn {
  height: 100%;
  width: auto;
  background: white;
  border: solid 2px green;
}

#target {
  background-color: #f7f7f7;
}

#input {
  width: 80%;
}

#rightbtn {
  width: 10%;
}
#content{
  margin: 00px 10px 10px;
}
p {
  float: left;
}

.el-row {
  padding: 15px 10px;
}
.el-col {
  border-radius: 4px;
}


</style>

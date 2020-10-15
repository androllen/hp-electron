<template>
  <div>
    <div id="target">
      <div>
        <el-input class="ctl_input" ref="inputName" v-model="m_target" :disabled="m_disable" placeholder="请输入内容"></el-input>
        <div>
          <el-button type="primary" :disabled="m_disable" @click="onStart"> 开始 </el-button>
          <el-button @click="onStop">停止</el-button>
        </div>
      </div>
    </div>
    <div id="content">
      <p><strong>扫描结果</strong></p>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="PocName" label="名称" width="200"> </el-table-column>
          <el-table-column prop="PocVersion" label="版本" width="200"></el-table-column>
          <el-table-column prop="Success" label="是否存在漏洞"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">利用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
var _data = {
  m_target: 'http://www.4dogs.cn',
  m_disable: false,
  tableData: [
    {
      PocName: 'jenkins_version_check',
      PocVersion: '',
      Success: '',
    },
  ],
};

export default {
  data() {
    return _data;
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({ path: '/exp_jenkins_shell', query: { targe: this.m_target } });
      console.log(this.m_target);
    },
    onStart() {
      this.m_disable = true;
    },
    onStop() {
      this.m_disable = false;
    },
  },
};
</script>

<style scoped>
#target {
  background-color: #f7f7f7;
  padding: 10px 10px 10px 10px;
}

.ctl_input {
  width: 80%;
  float: left;
  margin-right: 10px;
}
p {
  float: left;
  margin-left: 5px;
}
</style>
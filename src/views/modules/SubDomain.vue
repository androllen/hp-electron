<template>
  <div>
    <div id="target">
      <div id="_t_input">
        <el-input
          ref="inputName"
          v-model="m_target"
          :disabled="m_disable"
          placeholder="请输入内容">
		</el-input>
      </div>
      <div id="_t_input_btn">
        <el-button type="primary" :disabled="m_disable" @click="onStart">
			开始
		</el-button>
        <el-button @click="onStop">停止</el-button>
      </div>
    </div>
    <div id="content">
      <p><strong>扫描结果</strong></p>
      <div>
        <el-table :data="m_tableData" style="width: 100%">
          <el-table-column prop="ip" label="IP" width="200" header-align="center"></el-table-column>
          <el-table-column prop="CNAME" label="域名" header-align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { GUID } from "../../utils";
import ZmqJs from "../../service/zmq";

var _data = {
  m_target: "bernama.com",
  m_disable: false,
  m_result: "",
};

export default {
  data() {
    return _data;
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputName.focus();
    });
  },
  methods: {
    onStart() {
      this.m_disable = true;
      var task = {
        id: GUID(),
        scriptid: "waf_check",
        parameters: { url: this.m_target },
      };
      this.m_result = "";
      console.log(task);

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
  height: 40px;
  padding: 10px;
}

#_t_input {
  width: 80%;
  float: left;
}

#_t_input_btn {
  left: 80%;
  display: inline;
}

#content {
  margin: 0px 10px 10px;
}

p {
  float: left;
}

</style>

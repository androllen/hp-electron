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
          <el-table-column prop="ip" label="IP" width="180"></el-table-column>
          <el-table-column prop="CNAME" label="CName"></el-table-column>
          <el-table-column prop="vendor" label="CDN厂商"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// https://blog.csdn.net/qq_40282732/article/details/104343595
import { GUID } from "../../utils";
import ZmqJs from "../../service/zmq";

var _data = {
  m_target: "http://www.4dogs.cn",
  m_disable: false,
  m_tableData: [],
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
        scriptid: "cdn_detect",
        parameters: { url: this.m_target },
      };
      this.m_tableData = [];
      console.log(task);
      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(",");
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith("{") && json.endsWith("}")) {
            console.log("this ia public data");
            var obj = JSON.parse(json);
            console.log(obj);
            this.m_tableData.push(obj);
            this.m_disable = false;
          } else if (json == "end!!!") {
            console.log("end!!!");
          } else if (json.StartsWith("error_")) {
            console.log("error_");
          }
        } catch (e) {
          console.log("error..");
        } finally {
          this.m_disable = false;
        }
      });
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

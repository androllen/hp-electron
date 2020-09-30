<template>
  <div id="cdn">
    <div id="target">
      <el-row>
        <el-col id="input">
          <div>
            <el-input
              ref="inputName"
              v-model="m_target"
              :disabled="m_disable"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </el-col>
        <el-col id="rightbtn">
          <div>
            <el-button type="primary" :disabled="m_disable" @click="onStart"
              >开始</el-button
            >
          </div>
        </el-col>
        <el-col id="rightbtn">
          <div>
            <el-button @click="onStop">停止</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="content">
      <p>扫描结果</p>
      <div>
        <el-table :data="m_tableData" style="width: 100%">
          <el-table-column prop="ip" label="IP" width="180"></el-table-column>
          <el-table-column prop="cname" label="CName"></el-table-column>
          <el-table-column prop="cdncompany" label="CDN厂商"></el-table-column>
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
      console.log(task);
      let _zmq = new ZmqJs();
      if (_zmq.Check(task)) {
        _zmq.Subscribe(task.id, (topic) => {
          console.log("this ia public data");
          console.log(topic);
          var index = topic.indexOf(",");
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith("{") && json.endsWith("}")) {
            console.log(json);
          } else if (json == "end!!!") {
            ishas = false;
            console.log("ishas = false ");
          } else if (json.StartsWith("error_")) {
          }
        });
      }
    },
    onStop() {
      //   var zmqjs = new ZmqJs();
      //   var add = zmqjs.Add();
      //   add.then((val) => (this.m_target = val));
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
#content {
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

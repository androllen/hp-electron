<template>
  <div id="email">
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
          <el-table-column
            prop="value"
            label="邮箱"
            width="180"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// https://blog.csdn.net/qq_40282732/article/details/104343595
import { GUID } from "../../utils";
import ZmqJs from "../../service/zmq";
import { Email } from "../../model";

var _data = {
  m_target: "nagapt.com",
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
        scriptid: "mail_spider",
        parameters: { keyword: this.m_target },
      };
      this.m_tableData = [];
      // this.m_table = ['=======', '-----------------'];
      // console.log(task);
      // this.m_table.forEach((element) => {
      //   var _email = new Email(element);
      //   console.log(_email);
      //   this.m_tableData.push(_email);
      // });
      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(",");
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith("{") && json.endsWith("}")) {
            console.log("this ia public data");
            var obj = JSON.parse(json);
            console.log(obj.result);
            
            obj.result.forEach((element) => {
              var _email = new Email(element);
              console.log(_email);
              this.m_tableData.push(_email);
            });

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
#email {
  height: 100%;
  width: 100%;
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
  padding: 0px 10px 10px;
  float: left;
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

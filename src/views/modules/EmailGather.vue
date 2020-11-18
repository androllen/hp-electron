<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop"> </TxTarget>
    <div id="content">
      <p>扫描结果</p>
      <div>
        <el-table :data="m_tableData" style="width: 100%">
          <el-table-column prop="value" label="邮箱" min-width="300" header-align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { GUID } from "../../utils";
import ZmqJs from "../../service/zmq";
import { ModelEmail } from "../../model";

var _data = {
  m_target: 'nagapt.com',
  m_tableData: [],
};

export default {
  data() {
    return _data;
  },
  methods: {
    onStart(args) {
      var task = {
        id: GUID(),
        scriptid: 'mail_spider',
        parameters: { keyword: args },
      };
      this.m_tableData = [];
      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(',');
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith('{') && json.endsWith('}')) {
            console.log('this ia public data');
            var obj = JSON.parse(json);
            console.log(obj.result);

            obj.result.forEach((element) => {
              var _email = new ModelEmail(element);
              console.log(_email);
              this.m_tableData.push(_email);
            });
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error' + e);
        } finally {
          this.$refs.isdisabled.onDisabled(false);
        }
      });
    },
    onStop() {},
  },
};
</script>

<style scoped>
#content {
  padding: 0px 10px 10px;
}

p {
  float: left;
}
</style>

<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop"> </TxTarget>
    <div id="content">
      <div>
        <p>扫描结果</p>
      </div>
      <div>
        <p>{{ m_result }}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { GUID } from "../../utils";
import ZmqJs from "../../service/zmq";

var _data = {
  m_target: 'http://www.shufaai.com/',
  m_result: '',
};

export default {
  data() {
    return _data;
  },
  methods: {
    onStart(args) {
      var task = {
        id: GUID(),
        scriptid: 'waf_check',
        parameters: { url: args },
      };
      this.m_result = '';
      console.log(task);
      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(',');
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith('{') && json.endsWith('}')) {
            console.log('this ia public data');
            var obj = JSON.parse(json);
            console.log(obj);
            this.m_result = obj.waf;
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
    onStop() {
      console.log('test');
    },
  },
};
</script>

<style scoped>
#content {
  padding: 0px 10px 10px;
  float: left;
}

p {
  float: left;
}
</style>

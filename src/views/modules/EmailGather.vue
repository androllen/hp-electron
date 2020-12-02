<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop" @height="onHeight"> </TxTarget>
    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <el-table :data="m_tableData" style="width: 100%" :height="tableHeight">
          <el-table-column prop="value" label="邮箱" min-width="300" header-align="center"></el-table-column>
        </el-table>
      </template>
    </TxOutput>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';
import { ModelEmail } from '../../model';

var _data = {
  m_target: 'nagapt.com',
  m_tableData: [],
  targeHeight: 0,
  tableHeight: 0,
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
      this.$refs.whatRun.onStart();
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
          this.$refs.whatRun.onStop();
        }
      });
    },
    onStop() {
      this.$refs.whatRun.onStop();
      this.$refs.isdisabled.onDisabled(false);
    },
    onHeight(args) {
      this.targeHeight = args;
    },
    onGoBack(args) {
      this.tableHeight = args;
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop" @height="onHeight"> </TxTarget>
    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <el-table :data="m_tableData" style="width: 100%" :height="tableHeight">
          <el-table-column prop="ip" label="IP" width="200"></el-table-column>
          <el-table-column prop="url" label="域名"></el-table-column>
        </el-table>
      </template>
    </TxOutput>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';
import { ModeSubDomain } from '../../model';

var _data = {
  m_target: 'bernama.com',
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
        scriptid: 'subdomain',
        parameters: {
          url: args,
          mode: '01',
          flag: '11',
        },
      };
      this.m_tableData = [];
      console.log(task);
      this.$refs.whatRun.onStart();

      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(',');
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith('{') && json.endsWith('}')) {
            console.log('this ia public data');
            var obj = JSON.parse(json);
            console.log(obj);
            let ipstr = '';
            obj.ip.forEach((element) => {
              ipstr += element;
            });

            console.log(ipstr);
            let temp = new ModeSubDomain(obj.url, ipstr);
            this.m_tableData.push(temp);
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error..' + e);
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
.el-form-item {
  margin-bottom: 2px;
  margin-left: 10px;
}
</style>

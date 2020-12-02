<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop" @height="onHeight"> </TxTarget>
    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <el-table :data="m_tableData" style="width: 100%" :height="tableHeight">
          <el-table-column prop="ip" label="IP" width="180"></el-table-column>
          <el-table-column prop="CNAME" label="CName"></el-table-column>
          <el-table-column prop="vendor" label="CDN厂商"></el-table-column>
        </el-table>
      </template>
    </TxOutput>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '@/utils';
import ZmqJs from '@/service/zmq';

var _data = {
  m_target: 'http://www.4dogs.cn',
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
        scriptid: 'cdn_detect',
        parameters: { url: args },
      };
      this.m_tableData = [];
      this.$refs.whatRun.onStart();
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
            this.m_tableData.push(obj);
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error..');
        } finally {
          this.onStop();
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

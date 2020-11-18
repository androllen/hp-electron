<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop"> </TxTarget>
    <div id="content">
      <p><strong>扫描结果</strong></p>
      <div>
        <el-table :data="m_tableData" style="width: 100%">
          <el-table-column prop="ip" label="IP" width="200"></el-table-column>
          <el-table-column prop="url" label="域名"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';
import { ModeSubDomain } from '../../model';

var _data = {
  m_target: 'bernama.com',
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
        scriptid: 'subdomain',
        parameters: {
          url: args,
          mode: '01',
          flag: '11',
        },
      };
      this.m_tableData = [];
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
        }
      });
    },
    onStop() {},
  },
};
</script>

<style scoped>
#content {
  margin: 0px 10px 10px;
}

p {
  float: left;
}
</style>

<template>
  <div>
    <TxTarget :target="m_target" :enabled="m_disable" @start="onStart" @stop="onStop"> </TxTarget>
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
import { GUID } from '@/utils';
import ZmqJs from '@/service/zmq';

var _data = {
  m_target: 'http://www.4dogs.cn',
  m_disable: false,
  m_tableData: [],
};

export default {
  data() {
    return _data;
  },
  methods: {
    onStart(args) {
      console.log(args);

      // var task = {
      //   id: GUID(),
      //   scriptid: 'cdn_detect',
      //   parameters: { url: this.args.m_target },
      // };
      // this.m_tableData = [];
      // console.log(task);
      // ZmqJs.HandleSend(task, (topic) => {
      //   try {
      //     var index = topic.indexOf(',');
      //     var id = topic.substring(0, index - 1).trim();
      //     var json = topic.substring(index + 1).trim();

      //     if (json.startsWith('{') && json.endsWith('}')) {
      //       console.log('this ia public data');
      //       var obj = JSON.parse(json);
      //       console.log(obj);
      //       this.m_tableData.push(obj);
      //       this.m_disable = false;
      //     } else if (json == 'end!!!') {
      //       console.log('end!!!');
      //     } else if (json.StartsWith('error_')) {
      //       console.log('error_');
      //     }
      //   } catch (e) {
      //     console.log('error..');
      //   } finally {
      //     this.m_disable = false;
      //   }
      // });
    },
    onStop() {
      console.log('test');
      this.m_disable = false;
    },
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

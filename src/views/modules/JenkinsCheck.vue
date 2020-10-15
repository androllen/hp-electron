<template>
  <div>
    <div id="target">
      <div>
        <el-input class="ctl_input" ref="inputName" v-model="m_target" :disabled="m_disable" placeholder="请输入内容"></el-input>
        <div>
          <el-button type="primary" :disabled="m_disable" @click="onStart"> 开始 </el-button>
          <el-button @click="onStop">停止</el-button>
        </div>
      </div>
    </div>
    <div id="content">
      <p><strong>扫描结果</strong></p>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="PocName" label="名称" width="200"> </el-table-column>
          <el-table-column prop="PocVersion" label="版本" width="200"></el-table-column>
          <el-table-column prop="Success" label="是否存在漏洞"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-show="Seen">利用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';

var _data = {
  m_target: 'http://192.168.0.109:8010',
  m_disable: false,
  Seen: false,
  PocVersion: '',
  tableData: [
    {
      PocName: 'jenkins_version_check',
      PocVersion: '',
      Success: '',
    },
  ],
};

var jenkinsitem = [
  {
    PocName: 'jenkins_version_check',
    PocVersion: '',
    Success: '',
    Index: 0,
  },
];

export default {
  data() {
    return _data;
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({ path: '/exp_jenkins_shell', query: { targe: this.m_target, version: this.PocVersion } });
      console.log(this.m_target);
    },
    onStart() {
      this.m_disable = true;
      var task = {
        id: GUID(),
        scriptid: 'poc_framework',
        parameters: {
          url: this.m_target,
          pocname: 'jenkins_version_check',
        },
      };
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

            jenkinsitem.forEach((element) => {
              if (element['PocName'] === obj.pocname) {
                let index = element['Index'];
                element['PocVersion'] = this.PocVersion = obj.version.toString();
                console.log(element['PocVersion'] + '====');
                console.log(this.PocVersion + '====');

                this.tableData[index].PocVersion = obj.version.toString();
                this.tableData[index].Success = obj.success.toString();
                this.Seen = true;
              }
            });

            this.m_disable = false;
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error..' + e);
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
  padding: 10px 10px 10px 10px;
}

.ctl_input {
  width: 80%;
  float: left;
  margin-right: 10px;
}
p {
  float: left;
  margin-left: 5px;
}
</style>
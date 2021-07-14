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
      <div>
        <el-form ref="form" label-width="100px">
          <el-form-item label="选择搜索引擎:">
            <el-radio-group v-model="search">
              <el-radio label="Bing">Bing</el-radio>
              <el-radio label="Baidu">Baidu</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="content">
      <p>扫描结果</p>
      <div>
        <el-table :data="m_tableData">
          <el-table-column prop="Url" label="Url" width="400"></el-table-column>
          <el-table-column prop="Title" label="Title" width="400"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';
import { ModelUrl } from '../../model';

var _data = {
  m_target: 'Happy',
  m_disable: false,
  m_tableData: [],
  search: 'Baidu',
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
        scriptid: 'aux_tool',
        parameters: {
          keyword: this.m_target,
          pocname: 'urlspider',
          engine: this.search === 'Bing' ? 'bing' : 'baidu',
          flag: 10,
        },
      };
      this.m_tableData = [];
      console.log(task);
      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(',');
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();
          console.log('===\n\n\n' + json + '===\n\n\n');
          if (json.startsWith('{') && json.endsWith('}')) {
            console.log('this ia public data');
            var obj = JSON.parse(json);
            obj.result.forEach((element) => {
              for (let key in element) {
                console.log('key:' + key);
                console.log('value:' + element[key]);
                var temp = new ModelUrl(key, element[key]);
                this.m_tableData.push(temp);
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
  padding: 10px 10px 0px 10px;
}

.ctl_input {
  width: 80%;
  float: left;
  margin-right: 10px;
}

#select {
  float: left;
}
#content {
  margin: 0px 0px 10px 10px;
  clear: both;
  float: left;
}

.el-radio-group {
  float: left;
  margin-top: 13px;
}
p {
  float: left;
}
</style>

<template>
  <div>
    <div id="target">
      <div>
        <el-button class="gobtn" @click="onGo">返回</el-button>
        <el-input class="ctl_input" ref="inputName" v-model="m_target" :disabled="m_disable" placeholder="请输入内容"></el-input>
        <div>
          <el-button type="primary" :disabled="m_disable" @click="onStart">扫描</el-button>
          <el-button @click="onStop">停止</el-button>
        </div>
      </div>
    </div>
    <div id="content">
      <p>结果显示：</p>
      <p>{{ Success }}</p>
      <p>用户名：</p>
      <p>{{ Username }}</p>
      <p>密码：</p>
      <p>{{ Passwd }}</p>

      <div class="result">
        <el-row>
          <el-col :span="12"
            ><div>
              <p>请求结果</p>
              <div class="grid-content">
                <div class="scroll-tb">
                  <p>{{ RequestResult }}</p>
                </div>
              </div>
            </div></el-col
          >
          <el-col :span="12"
            ><div>
              <p>应答结果</p>
              <div class="grid-content">
                <div class="scroll-tb">
                  <p>{{ ResponseResult }}</p>
                </div>
              </div>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';

var _data = {
  m_target: '',
  m_disable: false,
  Success: '',
  Username: '',
  Passwd: '',
  ResponseResult: '',
  RequestResult: '',
};

export default {
  data() {
    return _data;
  },
  mounted() {
    this.$nextTick(() => {
      this.m_target = this.$route.query.targe;
    });
  },
  beforeCreate() {},
  methods: {
    onGo() {
      this.$router.go(-1);
    },
    onStart() {
      this.m_disable = true;
      var task = {
        id: GUID(),
        scriptid: 'poc_framework',
        parameters: {
          url: this.m_target,
          pocname: 'jboss_adminconsole_brute',
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
			this.Passwd = obj.passwd
			this.Username = obj.username
			this.RequestResult = obj.request[0]
			this.ResponseResult = obj.response[0]
			this.Success = obj.success.toString()

            this.m_disable = false;
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error..');
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
  padding: 10px;
}
.gobtn {
  float: left;
  margin-right: 10px;
}
.ctl_input {
  width: 70%;
  float: left;
  margin-right: 10px;
}
#content {
  margin: 0px 10px 10px;
}
p {
  float: left;
  margin-right: 7px;
}

.result {
  clear: both;
}

.grid-content {
  clear: both;
  border-radius: 4px;
  border: 1px;
  border-style: solid;
  border-color: gray;
  margin: 10px;
  height: 600px;
}

.scroll-tb {
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-track-color: #95a6aa;
  scrollbar-darkshadow-color: #85989c;
}
</style>
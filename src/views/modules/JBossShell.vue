<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" :placeholder="m_placeholder" @start="onStart" @stop="onStop">
      <template v-slot:goback>
        <el-button class="gobtn" @click="onGo">返回</el-button>
      </template>
    </TxTarget>
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
  m_placeholder: '请输入内容',
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
  methods: {
    onGo() {
      this.$router.go(-1);
    },
    onStart(args) {
      var task = {
        id: GUID(),
        scriptid: 'poc_framework',
        parameters: {
          url: args,
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
            this.Passwd = obj.passwd;
            this.Username = obj.username;
            this.RequestResult = obj.request[0];
            this.ResponseResult = obj.response[0];
            this.Success = obj.success.toString();
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
    onGo() {
      this.$router.go(-1);
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
.gobtn {
  float: left;
  margin-left: 10px;
}
</style>
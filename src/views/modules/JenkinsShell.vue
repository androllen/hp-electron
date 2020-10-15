<template>
  <div>
    <div id="target">
      <div>
        <el-button class="gobtn" @click="onGo">返回</el-button>
        <el-input class="ctl_input" ref="inputName" v-model="m_target" :disabled="m_disable" placeholder="请输入内容"></el-input>
        <div>
          <el-button type="primary" :disabled="m_disable" @click="onStart">爆破</el-button>
          <el-button @click="onStop">停止</el-button>
        </div>
      </div>
    </div>
    <div id="content" v-show="Seen">
      <p>用户名：</p>
      <p>{{ Username }}</p>
      <p>密码：</p>
      <p>{{ Passwd }}</p>
      <p>CMD：</p>
      <div>
        <el-input class="cmd" v-model="cmdinput" placeholder="请输入命令"></el-input>
        <div>
          <el-button type="primary" @click="onAttack">执行</el-button>
          <el-button @click="onStop">取消</el-button>
        </div>
      </div>

      <div class="result" v-show="Seen">
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
  cmdinput: '',
  Seen: false,
};
var version = '';

var _versionModels = [
  {
    Number: 'low',
    Poc: 'jenkins_Password_blasting',
  },
  {
    Number: 'high',
    Poc: 'jenkins_High_Version_Password_blasting',
  },
];

var _pocModels = [
  {
    Number: 'low',
    Poc: 'jenkins_Low_Version_Weak_Pass_Excute_Cmd',
  },
  {
    Number: 'high',
    Poc: 'jenkins_High_Version_Weak_Pass_Excute_Cmd',
  },
];

export default {
  data() {
    return _data;
  },
  mounted() {
    this.$nextTick(() => {
      this.m_target = this.$route.query.targe;
      this.version = this.$route.query.version;
    });
  },
  beforeCreate() {},
  methods: {
    onGo() {
      this.$router.go(-1);
    },
    onStart() {
      this.m_disable = true;
      let list = [];

      for (const key in _versionModels) {
        if (_versionModels.hasOwnProperty(key)) {
          const element = _versionModels[key];
          if (element['Number'] === this.version.toLowerCase()) {
            list.push(element['Poc']);
          }
        }
      }

      var task = {
        id: GUID(),
        scriptid: 'poc_framework',
        parameters: {
          url: this.m_target,
          pocname: list,
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
            this.Username = obj.username;
            this.Passwd = obj.password;
            this.Seen = obj.success;
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
    onAttack() {
      this.m_disable = true;
      let list = [];

      for (const key in _pocModels) {
        if (_pocModels.hasOwnProperty(key)) {
          const element = _pocModels[key];
          if (element['Number'] === this.version.toLowerCase()) {
            list.push(element['Poc']);
          }
        }
      }

      var task = {
        id: GUID(),
        scriptid: 'poc_framework',
        parameters: {
          url: this.m_target,
          pocname: list,
          cmd: this.cmdinput,
          username: this.Username,
          password: this.Passwd,
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

            this.RequestResult = obj.request.join('\r\n');
            this.ResponseResult = obj.response.join('\r\n');

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

.cmd {
  float: left;
  width: 30%;
}
</style>
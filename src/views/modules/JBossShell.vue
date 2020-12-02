<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" :placeholder="m_placeholder" @start="onStart" @stop="onStop" @height="onHeight">
      <template v-slot:goback>
        <el-button class="gobtn" @click="onGo">返回</el-button>
      </template>
    </TxTarget>
    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <div class="el-flex-container" :style="{ height: tableHeight + 'px' }">
          <div id="data">
            <div class="flex-container">
              <p class="item none">结果显示：</p>
              <p class="item auto">{{ Success }}</p>
            </div>
            <div class="flex-container">
              <p class="item none">用户名：</p>
              <p class="item auto">{{ Username }}</p>
            </div>
            <div class="flex-container">
              <p class="item none">密码：</p>
              <p class="item auto">{{ Passwd }}</p>
            </div>
          </div>

          <div>
            <div class="flex-container">
              <div class="flex">
                <p class="item none"><b>请求结果:</b></p>
                <div class="nui-scroll" :style="{ height: tableHeight - dataHeight + 'px' }">
                  <p class="item">
                    {{ RequestResult }}
                  </p>
                </div>
              </div>
              <div class="flex">
                <p class="item none"><b>应答结果:</b></p>
                <div class="nui-scroll" :style="{ height: tableHeight - dataHeight + 'px' }">
                  <p class="item">
                    {{ ResponseResult }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </TxOutput>
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
  targeHeight: 0,
  tableHeight: 0,
  dataHeight: 0,
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
          this.onStop();
        }
      });
    },
    onStop() {
      this.$refs.whatRun.onStop();
      this.$refs.isdisabled.onDisabled(false);
    },
    onGo() {
      this.$router.go(-1);
    },
    onHeight(args) {
      this.targeHeight = args;
    },
    onGoBack(args) {
      this.tableHeight = args;
    },
    onData() {
      this.dataHeight = document.getElementById('data').offsetHeight;
    },
  },
  mounted() {
    this.onData();
  },
};
</script>

<style scoped>
.flex-container {
  overflow: auto;
  display: flex;
  padding: 5px;
}

.item {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}
.auto {
  flex: auto;
}

.flex {
  flex: 1;
}

.none {
  flex: none;
}
.gobtn {
  float: left;
  margin-left: 10px;
}
</style>
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
    <div id="content">
      <p>用户名：</p>
      <p>{{ Username }}</p>
      <p>密码：</p>
      <p>{{ Passwd }}</p>
      <p>CMD：</p>
      <div>
        <el-input class="cmd" v-model="cmdinput" placeholder="请输入命令"></el-input>
        <div>
          <el-button type="primary">执行</el-button>
          <el-button>取消</el-button>
        </div>
      </div>

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
var _data = {
  m_target: '',
  m_disable: false,
  Success: '',
  Username: '',
  Passwd: '',
  ResponseResult: '',
  RequestResult: '',
  cmdinput: '',
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
    onStart() {},
    onStop() {},
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
  width: 50%;
}
</style>
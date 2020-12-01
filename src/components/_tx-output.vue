<template>
  <div id="panel" class="el-flex-container" :style="{ height: this.outputHeight + 'px' }">
    <p id="lable" class="title none">
      <b>{{ m_title }}</b>
    </p>
    <div class="auto" id="reply">
      <slot name="other"></slot>
    </div>
    <div id="load" class="loading none">
      <div class="flex-container">
        <TxLoading class="txload" ref="isloading" />
        <p class="none">{{ m_status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      isPlay: false,
      isPause: true,
      m_title: this.title,
      m_status: '未开始',
      outputHeight: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: '扫描结果',
    },
    targeHeight: Number,
  },
  methods: {
    onInput(args) {
      this.m_target = args;
    },
    onStart() {
      this.$refs.isloading.onPlay(true);
      this.m_status = '开始';
      console.log(this.m_status);
      this.onAutoHeight();
    },
    onStop() {
      this.$emit('stop');
      this.$refs.isloading.onPause(true);
      this.m_status = '结束';
      console.log(this.m_status);
    },
    onAutoHeight() {
      let h3Height = document.getElementById('lable').clientHeight;
      let loadingHeight = document.getElementById('load').offsetHeight;
      this.outputHeight = document.documentElement.clientHeight - 37 - 90 - this.targeHeight;
      console.log('h3Height=' + h3Height);
      // console.log(' loadingHeight=' + loadingHeight);
      // console.log('all - this.targeHeight =' + this.outputHeight);
      // console.log('input targeHeight=' + this.targeHeight);
      let back = this.outputHeight - h3Height - loadingHeight - 15;
      this.$emit('gotoback', back);
    },
  },
  beforeUpdate() {
    this.onAutoHeight();
  },
  updated() {
    this.onAutoHeight();
  },
  mounted() {
    window.onresize = () => {
      this.onAutoHeight();
    };
  },
};
</script>

<style scoped>
.el-flex-container {
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.flex-container {
  overflow: hidden;
  display: flex;
}
.txload {
  align-self: center;
  margin: 0 10px;
}
.auto {
  flex: auto;
  padding-top: 0px;
  padding-right: 10px;
  padding-bottom: 0px;
  padding-left: 10px;
}
.none {
  flex: none;
}
.title {
  height: auto;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding-left: 10px;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.loading {
  padding-top: 0px;
  padding-right: 10px;
  padding-bottom: 0px;
  padding-left: 10px;
  height: auto;
  background-color: #f7f7f7;
}
</style>
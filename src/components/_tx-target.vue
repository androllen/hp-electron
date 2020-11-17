<template>
  <div class="el-flex-container">
    <div class="flex-container">
      <el-input
        ref="inputtarget"
        class="el-item auto"
        v-model="m_target"
        :disabled="m_disable"
        placeholder="请输入内容"
      ></el-input>
      <el-button class="el-item none" type="primary" :disabled="m_disable" @click="onStart">开始</el-button>
      <el-button class="el-item none" @click="onStop">停止</el-button>
    </div>
    <div class="el-no-flex-container"></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      m_target: this.target,
      m_disable: this.enabled,
    };
  },
  props: {
    target: String,
    enabled: Boolean,
  },
  methods: {
    onStart() {
      this.m_disable = true;
      this.$emit('start', this.m_target);
    },
    onStop() {
      // this.m_disable = false;
      this.$emit('stop');
    },
  },
};
</script>

<style scoped>
.el-flex-container {
  overflow: hidden;
  background-color: #cbd0d1;
  display: flex;
  flex-direction: column;
}

.flex-container {
  background-color: #F4F7F8;
  overflow: hidden;
  display: flex;
}

.el-no-flex-container {
  display: flex;
}

.el-item {
  margin: 1em;
  min-width: 0;
}

.auto {
  flex: auto;
}

.none {
  flex: none;
}

.item {
  margin: 0px;
  padding: 0;
  width: 110px;
  min-width: 0;
  background-color: #1B5385;
  color: white;
  font-family: monospace;
  font-size: 13px;
}
</style>
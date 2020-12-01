<template>
  <div id="grid" class="el-flex-container">
    <div class="flex-container">
      <div class="el-item none">
        <slot name="goback"> </slot>
      </div>
      <el-input
        ref="inputtarget"
        class="el-item auto"
        :value="m_target"
        @input="onInput"
        :disabled="m_disabled"
        :placeholder="m_placeholder"
      ></el-input>
      <el-button class="el-item none" type="primary" :disabled="m_disabled" @click="onStart">开始</el-button>
      <el-button class="el-item none" @click="onStop">停止</el-button>
    </div>
    <div class="el-no-flex-container">
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      m_target: this.target,
      m_disabled: false,
      m_placeholder: this.placeholder,
    };
  },
  props: {
    target: String,
    placeholder: String,
  },
  methods: {
    onInput(args) {
      this.m_target = args;
    },
    onStart() {
      this.m_disabled = true;
      this.$emit('start', this.m_target);
    },
    onStop() {
      this.$emit('stop');
    },
    onDisabled(args) {
      this.m_disabled = args;
    },
  },
  mounted() {
    let targeHeight = document.getElementById('grid').offsetHeight;
    console.log('child=' + targeHeight);
    this.$emit('height', targeHeight);
  },
};
</script>

<style scoped>
.el-flex-container {
  overflow: hidden;
  background-color: #f4f7f8;
  display: flex;
  flex-direction: column;
}

.flex-container {
  overflow: hidden;
  display: flex;
}

.el-no-flex-container {
  display: flex;
}

.el-button + .el-button {
  margin-left: 0px;
}

.el-item {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
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
  background-color: #1b5385;
  color: white;
  font-family: monospace;
  font-size: 13px;
}
</style>
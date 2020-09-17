<template>
<el-button-group>
  <el-button type="text" :disabled="isLeft" icon="el-icon-arrow-left">后退</el-button>
  <el-dropdown @command="handleCommand">
    <el-button type="text" :disabled="isMore" icon="el-icon-more">
    </el-button>
    <el-dropdown-menu slot="dropdown" align="center">
      <el-dropdown-item v-for="item in options" :key="item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-button type="text" :disabled="isRight">前进<i class="el-icon-arrow-right el-icon--right"></i></el-button>

</el-button-group>
</template>

<script>
export default {
  data() {
    return {
      isLeft: true,
      isMore: false,
      isRight: true,
      options: [{
        value: 'a',
        label: '黄金糕'
      }, {
        value: 'b',
        label: '双皮奶'
      }, {
        value: 'c',
        label: '蚵仔煎'
      }, {
        value: 'c',
        label: '龙须面'
      }, {
        value: 'e',
        label: '北京烤鸭'
      }],
    }
  },
  //当路由改变时，运行newpage函数
  watch: {
    '$route': 'newpage'
  },
  methods: {
    newpage() {
      console.log("");
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    }
  },
}
</script>

<style scoped>
.el-dropdown {
  float: left;
  position: relative;
  color: #606266;
  font-size: 14px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-button-group {
  float: right;
}

.el-button--text {
  padding-left: 10px;
  padding-right: 10px;
}
</style>

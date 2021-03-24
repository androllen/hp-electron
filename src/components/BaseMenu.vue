<template>
  <div id="ele_div">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu router :default-active="$route.path" class="el-menu-vertical" @open="handleOpen" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>测试A</span>
            </template>
            <el-menu-item index="/info_cdn">测试A</el-menu-item>
            <el-menu-item index="/info_waf">测试A</el-menu-item>
            <el-menu-item index="/info_email">测试A</el-menu-item>
            <el-menu-item index="/info_subdomain">测试A</el-menu-item>
            <el-menu-item index="/info_whois">测试A</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>测试B</span>
            </template>
            <el-menu-item index="/exp_jboss_scan">测试B</el-menu-item>
            <el-menu-item index="/exp_jenkins_check">测试B</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>测试C</span>
            </template>
            <el-menu-item index="/tool_url">测试C</el-menu-item>
            <el-menu-item index="/tool_md5">测试C</el-menu-item>
            <el-menu-item index="/tool_pwd">测试C</el-menu-item>
            <el-menu-item index="/tool_decrypt">测试C</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Bus from '../router/bus'


export default {
  methods: {
    // https://www.jianshu.com/p/ecbbd6810f7f
    handleSelect(key, keyPath) {
      console.log(key, keyPath + '*');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath + '-');
    },
  },
  mounted() {
    var self = this;
    Bus.$on('activeIndex', function (defaultActive) {
	  self.defaultActive = defaultActive;
	  console.log(defaultActive);
    });
  },
  //   data() {
  //     return {
  //       activeIndex: '/info_cdn',
  //     };
  //   },
  //   watch: {
  //     $route(to, from) {
  //       console.log(`前往路由：${to.path}`);
  //       let pathName = this.$route.name;
  //       if (pathName === 'CdnDetect') {
  //         console.log('CdnDetect===');
  //         this.activeIndex = '/info_cdn';
  //       } else if (pathName === 'WafCheck') {
  //         console.log('WafCheck===');
  //         this.activeIndex = '/info_waf';
  //       }
  //     },
  //   },
};
</script>

<style scoped>
#ele_div {
  width: 100%;
  height: calc(100%-50px);
  position: absolute;
  background: green;
  text-align: left;
}
</style>

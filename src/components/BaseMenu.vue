<template>
  <el-row class="views nui-scroll">
    <el-col :span="24">
      <el-menu router :default-active="$route.path" class="el-menu-vertical" @open="handleOpen" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>信息收集</span>
          </template>
          <el-menu-item index="/info_cdn">Cdn 检测</el-menu-item>
          <el-menu-item index="/info_waf">Waf 检测</el-menu-item>
          <el-menu-item index="/info_email">邮箱地址收集</el-menu-item>
          <el-menu-item index="/info_subdomain">子域名爆破</el-menu-item>
          <el-menu-item index="/info_whois">WhoIs 反查</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>专用漏洞</span>
          </template>
          <el-menu-item index="/exp_jboss_scan">JBoss 检测</el-menu-item>
          <el-menu-item index="/exp_jenkins_check">Jenkins 爆破</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>辅助工具</span>
          </template>
          <el-menu-item index="/tool_url">URL 收集</el-menu-item>
          <el-menu-item index="/tool_md5">MD5 查询</el-menu-item>
          <el-menu-item index="/tool_pwd">密码生成器</el-menu-item>
          <el-menu-item index="/tool_decrypt">加解密</el-menu-item>
          <el-menu-item index="/tool_decrypt">加解密</el-menu-item>
          <el-menu-item index="/tool_decrypt">加解密</el-menu-item>
          <el-menu-item index="/tool_decrypt">加解密</el-menu-item>
          <el-menu-item index="/tool_decrypt">加解密</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import Bus from '../router/bus';

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
};
</script>

<style scoped>
.views {
  height: 100%;
}

.nui-scroll {
  border-style: solid;
  border-left-width: 0px;
  border-right-width: 1px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #000;
  width: auto;
  overflow: auto;
}

.nui-scroll::-webkit-scrollbar {
  width: 9px;
  height: 3px;
}

/*正常情况下滑块的样式*/
.nui-scroll::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #e8b28e;
}

/*正常时候的主干部分*/
.nui-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 1px;
}
</style>

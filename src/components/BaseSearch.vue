<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import Bus from '../router/bus'

export default {
  data() {
    return {
      restaurants: [],
      state1: '',
      state2: '',
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    loadAll() {
      return [
        { value: 'Cdn 检测', address: '/info_cdn' },
        { value: 'Waf 检测', address: '/info_waf' },
        { value: '邮箱地址收集', address: '/info_email' },
        { value: '子域名爆破', address: '/info_subdomain' },
        { value: 'WhoIs 反查', address: '/info_whois' },
        { value: 'JBoss 检测', address: '/exp_jboss_scan' },
        { value: 'Jenkins 爆破', address: '/exp_jenkins_check' },
        { value: 'URL 收集', address: '/tool_url' },
        { value: 'MD5 查询', address: '/tool_md5' },
        { value: '密码生成器', address: '/tool_pwd' },
        { value: '加解密', address: '/tool_decrypt' },
      ];
    },
    handleSelect(item) {
      console.log(item);
	  this.$router.push({ path: item.address });
      Bus.$emit('activeIndex',item.address)
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>
<style >
.inline-input {
  width: 250px;
}
</style>
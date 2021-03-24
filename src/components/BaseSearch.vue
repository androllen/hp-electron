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
        { value: '测试A', address: '/info_cdn' },
        { value: '测试A', address: '/info_waf' },
        { value: '测试A', address: '/info_email' },
        { value: '测试A', address: '/info_subdomain' },
        { value: '测试A', address: '/info_whois' },
        { value: '测试A', address: '/exp_jboss_scan' },
        { value: '测试A', address: '/exp_jenkins_check' },
        { value: '测试A', address: '/tool_url' },
        { value: '测试A', address: '/tool_md5' },
        { value: '测试A', address: '/tool_pwd' },
        { value: '测试A', address: '/tool_decrypt' },
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
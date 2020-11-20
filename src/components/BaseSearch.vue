<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import Bus from '../router/bus';
import getPageRoutes from '../router/view';

export default {
  data() {
    return {
      pageroutes: [],
      state: '',
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var pageroutes = this.pageroutes;
      var results = queryString ? pageroutes.filter(this.createFilter(queryString)) : pageroutes;
      // // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (pageroutes) => {
        return pageroutes.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
      };
    },
    handleSelect(item) {
      console.log(item);
      this.$router.push({ path: item.path });
      Bus.$emit('activeIndex', item.path);
    },
  },
  mounted() {
    this.pageroutes = getPageRoutes();
  },
};
</script>
<style >
.inline-input {
  width: 250px;
}
</style>
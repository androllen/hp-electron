<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
    <el-form-item label="目标全名">
      <el-col :span="11">
        <el-input></el-input>
      </el-col>
      <el-col class="line" :span="2">昵称</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="11">
        <el-input></el-input>
      </el-col>
      <el-col class="line" :span="2">电话号码</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="旧密码">
      <el-col :span="11">
        <el-input></el-input>
      </el-col>
      <el-col class="line" :span="2">数字</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="关键词">
      <el-col :span="11">
        <el-input></el-input>
      </el-col>
      <el-col class="line" :span="2">爱人名称</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="机构名称">
      <el-col :span="11">
        <el-input></el-input>
      </el-col>
      <el-col class="line" :span="2">目标QQ</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="特殊资源">
      <el-radio-group v-model="formLabelAlign.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="域名" :inline="true">
      <el-input v-model="formLabelAlign.value"></el-input>
      <el-button>删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '2',
        type: '1',
        resource: '',
        value: '',
      },
    };
  },
};
</script>

<style scoped>
.line {
  text-align: right;
  padding: 0 6px 0 0px;
}
</style>
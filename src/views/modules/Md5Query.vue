<template>
  <div>
    <div id="target">
      <div id="_t_input">
        <el-input ref="inputName" v-model="m_target" :disabled="m_disable" placeholder="16/32 位 MD5值"> </el-input>
      </div>
      <div id="_t_input_btn">
        <el-button type="primary" :disabled="m_disable" @click="onStart"> 开始 </el-button>
        <el-button @click="onStop">停止</el-button>
      </div>
    </div>
    <div id="content">
      <p><strong>扫描结果</strong></p>
      <div>
        <el-table :data="m_tableData" style="width: 100%">
          <el-table-column prop="Md5_32" label="MD5 32位" width="180"></el-table-column>
          <el-table-column prop="Md5_16" label="MD5 16位"></el-table-column>
          <el-table-column prop="SN" label="值"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { ModelMd5 } from '../../model';
import { GetMd516, GetMd532 } from '../../db/md5';

var _data = {
  m_target: 'ac59075b964b0715',
  m_disable: false,
  m_tableData: [],
};

export default {
  data() {
    return _data;
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputName.focus();
    });
  },
  methods: {
    onStart() {
      this.m_disable = true;
      if (this.m_target.length == 16) {
        GetMd516(this.m_target, this.dataDeal);
      } else {
        GetMd532(this.m_target, this.dataDeal);
      }
      this.m_disable = false;
    },
    onStop() {
      this.m_disable = false;
    },
    dataDeal(obj) {
      console.log('begin deal');
      for (var i = 0; i < obj.length; ++i) {
        var _model = new ModelMd5(obj[i].md5_32, obj[i].md5_16, obj[i].SN);
        console.log(_model);
        this.m_tableData.push(_model);
      }
    },
  },
};
</script>

<style scoped>
#target {
  background-color: #f7f7f7;
  height: 40px;
  padding: 10px;
}

#_t_input {
  width: 80%;
  float: left;
}

#_t_input_btn {
  left: 80%;
  display: inline;
}

#content {
  margin: 0px 10px 10px;
}

p {
  float: left;
}
</style>
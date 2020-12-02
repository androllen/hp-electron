<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" :placeholder="m_holder" @start="onStart" @stop="onStop" @height="onHeight">
    </TxTarget>
    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <el-table :data="m_tableData" style="width: 100%" :height="tableHeight">
          <el-table-column prop="Md5_32" label="MD5 32位" width="180"></el-table-column>
          <el-table-column prop="Md5_16" label="MD5 16位"></el-table-column>
          <el-table-column prop="SN" label="值"></el-table-column>
        </el-table>
      </template>
    </TxOutput>
  </div>
</template>

<script type="text/javascript">
import { ModelMd5 } from '../../model';
import { GetMd516, GetMd532 } from '../../db/md5';

var _data = {
  m_target: 'ac59075b964b0715',
  m_holder: '16/32 位 MD5值',
  m_tableData: [],
  targeHeight: 0,
  tableHeight: 0,
};

export default {
  data() {
    return _data;
  },
  methods: {
    onStart() {
      this.$refs.whatRun.onStart();
      if (this.m_target.length == 16) {
        GetMd516(this.m_target, this.dataDeal);
      } else {
        GetMd532(this.m_target, this.dataDeal);
      }
      this.onStop();
    },
    onStop() {
      this.$refs.whatRun.onStop();
      this.$refs.isdisabled.onDisabled(false);
    },
    dataDeal(obj) {
      console.log('begin deal');
      for (var i = 0; i < obj.length; ++i) {
        var _model = new ModelMd5(obj[i].md5_32, obj[i].md5_16, obj[i].SN);
        console.log(_model);
        this.m_tableData.push(_model);
      }
    },
    onHeight(args) {
      this.targeHeight = args;
    },
    onGoBack(args) {
      this.tableHeight = args;
    },
  },
};
</script>

<style scoped>
</style>
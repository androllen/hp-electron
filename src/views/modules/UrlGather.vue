<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop" @height="onHeight">
      <template v-slot:other>
        <div>
          <el-form ref="form" label-width="100px">
            <el-form-item label="选择搜索引擎:">
              <el-radio-group v-model="search">
                <el-radio label="Bing">Bing</el-radio>
                <el-radio label="Baidu">Baidu</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </TxTarget>

    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <el-table :data="m_tableData" style="width: 100%" :height="tableHeight">
          <el-table-column prop="Url" label="Url"></el-table-column>
          <el-table-column prop="Title" label="Title"></el-table-column>
        </el-table>
      </template>
    </TxOutput>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';
import { ModelUrl } from '../../model';
import { fileContents } from '../../utils/json';

var _data = {
  m_target: '4dogs',
  m_tableData: [],
  search: 'Baidu',
  json: fileContents,
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
      this.m_tableData = [];
      var obj = JSON.parse(this.json);
      obj.result.forEach((element) => {
        for (let key in element) {
          var temp = new ModelUrl(key, element[key]);
          this.m_tableData.push(temp);
        }
      });
    },
    onStop() {
      this.$refs.whatRun.onStop();
      this.$refs.isdisabled.onDisabled(false);
    },
    onGoBack(args) {
      this.$nextTick(() => {
        this.tableHeight = args;
      });
    },
    onHeight(args) {
      this.targeHeight =args;
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 2px;
  margin-left: 10px;
}
</style>

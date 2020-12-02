<template>
  <div>
    <TxTarget :target="m_target" ref="isdisabled" @start="onStart" @stop="onStop" @height="onHeight"> </TxTarget>
    <TxOutput ref="whatRun" :targeHeight="targeHeight" @gotoback="onGoBack">
      <template v-slot:other>
        <div :style="{ height: tableHeight + 'px' }" class="nui-scroll">
          <div class="el-flex-container">
            <div class="flex-container">
              <p class="item none">域名:</p>
              <p class="item auto">{{ m_domain }}</p>
            </div>
            <div class="flex-container">
              <p class="item none">地址:</p>
              <p class="item auto">{{ m_addr }}</p>
            </div>
            <div class="flex-container">
              <p class="item none">邮箱:</p>
              <p class="item auto">{{ m_email }}</p>
            </div>
            <div class="flex-container">
              <p class="item none">注册人:</p>
              <p class="item auto">{{ m_register }}</p>
            </div>
            <div class="flex-container">
              <p class="item none">电话:</p>
              <p class="item auto">{{ m_phone }}</p>
            </div>

            <el-table :data="m_type" style="width: 100%">
              <el-table-column prop="gtype" label="获取类型" width="150"></el-table-column>
              <el-table-column prop="CNAME" label="域名"></el-table-column>
              <el-table-column prop="ip" label="IP"></el-table-column>
            </el-table>
            <el-table :data="m_ns" style="width: 100%">
              <el-table-column prop="nsr" label="NS记录" width="150"></el-table-column>
              <el-table-column prop="ip" label="IP"></el-table-column>
            </el-table>
            <el-table :data="m_mx" style="width: 100%">
              <el-table-column prop="mxr" label="MX记录" width="150"></el-table-column>
              <el-table-column prop="ip" label="IP"></el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </TxOutput>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import { dnslookup } from '../../utils/dns';
import ZmqJs from '../../service/zmq';
import { ModeMX, ModeNs } from '../../model';

var _data = {
  m_target: 'http://www.4dogs.cn/',
  m_result: '',
  m_domain: '',
  m_email: '',
  m_register: '',
  m_phone: '',
  m_addr: '',
  m_type: [],
  m_ns: [],
  m_mx: [],
  targeHeight: 0,
  tableHeight: 0,
};

export default {
  data() {
    return _data;
  },
  methods: {
    onStart(args) {
      var task = {
        id: GUID(),
        scriptid: 'who_is',
        parameters: { url: args },
      };
      this.m_result = '';
      console.log(task);
      this.$refs.whatRun.onStart();

      ZmqJs.HandleSend(task, (topic) => {
        try {
          var index = topic.indexOf(',');
          var id = topic.substring(0, index - 1).trim();
          var json = topic.substring(index + 1).trim();

          if (json.startsWith('{') && json.endsWith('}')) {
            console.log('this ia public data');
            var obj = JSON.parse(json);
            console.log(obj);

            this.m_domain = obj.domain;
            this.m_email = obj.email;
            this.m_register = obj.registrar;
            this.m_phone = obj.phone;
            this.m_addr = obj.addr;
            // this.m_registrant = obj.registrant;

            obj.NS.forEach((element) => {
              dnslookup(element, (err, address, family) => {
                let temp = new ModeNs(element, address);
                this.m_ns.push(temp);
              });
            });

            obj.MX.forEach((element) => {
              dnslookup(element, (err, address, family) => {
                let temp = new ModeMX(element, address);
                this.m_mx.push(temp);
              });
            });
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error' + e);
        } finally {
          this.$refs.isdisabled.onDisabled(false);
          this.$refs.whatRun.onStop();
        }
      });
    },
    onStop() {
      this.$refs.whatRun.onStop();
      this.$refs.isdisabled.onDisabled(false);
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
.flex-container {
  overflow: auto;
  display: flex;
  margin: 5px;
}

.item {
  margin: 5px;
  padding: 0;
  width: 70px;
}

.none {
  flex: none;
}
.auto {
  flex: auto;
}
</style>

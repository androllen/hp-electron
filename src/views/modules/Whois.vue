<template>
  <div>
    <div id="target">
      <div id="_t_input">
        <el-input ref="inputName" v-model="m_target" :disabled="m_disable" placeholder="请输入内容"> </el-input>
      </div>
      <div id="_t_input_btn">
        <el-button type="primary" :disabled="m_disable" @click="onStart"> 开始 </el-button>
        <el-button @click="onStop">停止</el-button>
      </div>
    </div>
    <div id="content">
      <div>
        <p><strong>扫描结果</strong></p>
      </div>
      <div>
        <el-row>
          <el-col>
            <div>
              <p>域名:</p>
              <p>{{ m_domain }}</p>
            </div>
            <div>
              <p>地址:</p>
              <p>{{ m_addr }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <p>邮箱:</p>
            <p>{{ m_email }}</p>
          </el-col>
          <el-col :span="8">
            <p>注册人:</p>
            <p>{{ m_register }}</p>
          </el-col>
          <el-col :span="8">
            <p>电话:</p>
            <p>{{ m_phone }}</p>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="left_table">
          <el-table :data="m_type" style="width: 100%">
            <el-table-column prop="gtype" label="获取类型" width="150"></el-table-column>
            <el-table-column prop="CNAME" label="域名"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
          </el-table>
        </div>
        <div class="right_table">
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
    </div>
  </div>
</template>

<script type="text/javascript">
import { GUID } from '../../utils';
import { dnslookup } from '../../utils/dns';
import ZmqJs from '../../service/zmq';
import { ModeMX, ModeNs } from '../../model';

var _data = {
  m_target: 'http://www.51job.cn/',
  m_disable: false,
  m_result: '',
  m_domain: '',
  m_email: '',
  m_register: '',
  m_phone: '',
  m_addr: '',
  m_type:[],
  m_ns: [],
  m_mx: [],
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
      var task = {
        id: GUID(),
        scriptid: 'who_is',
        parameters: { url: this.m_target },
      };
      this.m_result = '';
      console.log(task);
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

            this.m_disable = false;
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error..');
        } finally {
          this.m_disable = false;
        }
      });
    },
    onStop() {
      this.m_disable = false;
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
  padding: 0px 10px 10px;
  float: left;
  width: 100%;
  height: 100%;
  background: white;
}

p {
  display: inline;
  float: left;
  top: 10px;
}

.left_table {
  width: 50%;
  float: left;
  height: 100%;
}

.right_table {
  width: 50%;
  height: auto;
  float: right;
}
</style>

<template>
  <el-tabs class="el-ecrypt" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="凯撒加解密" name="first">
      <div id="app">
        <div class="box">
          <p>输入</p>
          <el-input type="textarea" :rows="6" v-model="input" placeholder="要加密的内容或者要解密的内容,对字母有效"></el-input>
          <div>
            <p>密码</p>
            <el-input placeholder="数字0~25;解密可空,自动猜测" v-model="Keylock"></el-input>
          </div>

          <div>
            <p>自动解密时关键字</p>
            <el-input placeholder="解密密钥为空时使用" v-model="Mark"></el-input>
          </div>

          <div>
            <p>
              是否大写输出
              <el-checkbox name="type" v-model="IsUpper"></el-checkbox>
            </p>
          </div>
        </div>
        <div class="cbox">
          <el-button @click="BeginCmd('encipher')">加密</el-button>
          <el-button @click="BeginCmd('decipher')">解密</el-button>
        </div>
        <div class="box">
          <p>输出</p>
          <el-input type="textarea" :rows="6" v-model="output"></el-input>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="栅栏加解密" name="second">
      <div id="app">
        <div class="box">
          <p>输入</p>
          <el-input type="textarea" :rows="6" v-model="input" placeholder="要加密的内容或者要解密的内容"></el-input>
          <div>
            <p>密码</p>
            <el-input placeholder="数字，小于输入长度；解密可空,自动猜测" v-model="Keylock"></el-input>
          </div>

          <div>
            <p>自动解密时关键字</p>
            <el-input placeholder="解密密钥为空时使用" v-model="Mark"></el-input>
          </div>

          <div>
            <p>
              是否大写输出
              <el-checkbox name="type" v-model="IsUpper"></el-checkbox>
            </p>
          </div>
        </div>
        <div class="cbox">
          <el-button @click="BeginCmd('encipher')">加密</el-button>
          <el-button @click="BeginCmd('decipher')">解密</el-button>
        </div>
        <div class="box">
          <p>输出</p>
          <el-input type="textarea" :rows="6" v-model="output"></el-input>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="莫斯加解密" name="third">
      <div id="app">
        <div class="box">
          <p>输入</p>
          <el-input type="textarea" :rows="6" v-model="input" placeholder="要加密的内容或者要解密的内容"></el-input>
          <div>
            <p>Space:(可为空格)</p>
            <el-input placeholder="/" v-model="Space"></el-input>
          </div>

          <div>
            <p>Short:</p>
            <el-input placeholder="." v-model="Short"></el-input>
          </div>

          <div>
            <p>Long:</p>
            <el-input placeholder="-" v-model="Long"></el-input>
          </div>

          <div>
            <p>
              是否大写输出
              <el-checkbox name="type" v-model="IsUpper"></el-checkbox>
            </p>
          </div>
        </div>
        <div class="cbox">
          <el-button @click="BeginCmd('encipher')">加密</el-button>
          <el-button @click="BeginCmd('decipher')">解密</el-button>
        </div>
        <div class="box">
          <p>输出</p>
          <el-input type="textarea" :rows="6" v-model="output"></el-input>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script scoped>
import { GUID } from '../../utils';
import ZmqJs from '../../service/zmq';

var _data = {
  activeName: 'first',
  input: '',
  Keylock: '',
  Mark: '',
  IsUpper: '',
  output: '',
  Space: '',
  Short: '',
  Long: '',
};

export default {
  data() {
    return _data;
  },
  methods: {
    BeginCmd(arg) {
      if (this.activeName === 'first') {
        var task = {
          id: GUID(),
          scriptid: 'aux_tool',
          parameters: {
            pocname: 'encrypt',
            method: 'caesar',
            action: arg,
            input: this.input,
            key: this.Keylock === '' ? 'auto' : this.Keylock,
            mark: this.Mark,
            case: this.IsUpper === true ? 'upper' : 'lower',
          },
        };
      } else if (this.activeName == 'second') {
        var task = {
          id: GUID(),
          scriptid: 'aux_tool',
          parameters: {
            pocname: 'encrypt',
            method: 'fence',
            action: arg,
            input: this.input,
            key: this.Keylock === '' ? 'auto' : this.Keylock,
            mark: this.Mark,
            case: this.IsUpper === true ? 'upper' : 'lower',
          },
        };
      } else {
        var task = {
          id: GUID(),
          scriptid: 'aux_tool',
          parameters: {
            pocname: 'encrypt',
            method: 'morse',
            action: arg,
            input: this.input,
            var_space: this.Space,
            var_short: this.Short,
            var_long: this.Long,
            case: this.IsUpper === true ? 'upper' : 'lower',
          },
        };
      }

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
            this.output = obj.result;
          } else if (json == 'end!!!') {
            console.log('end!!!');
          } else if (json.StartsWith('error_')) {
            console.log('error_');
          }
        } catch (e) {
          console.log('error..');
        } finally {
        }
      });
    },
    handleClick(tab, event) {
      console.log(this.activeName);
    },
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.cbox {
  width: 20%;
  overflow: hidden;
  text-align: center;
  line-height: 200px;
}

.box {
  width: 40%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
}

.ih {
  height: 300px;
}

p {
  float: left;
}

.letter {
  text-align: center;
  float: left;
}
el-form-item {
  float: left;
}
.el-ecrypt {
  margin: 10px;
}
</style>
<template>
  <div>
    <div class="flex-container">
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">目标全名:</div>
          <div class="form-input auto">
            <el-input
              ref="inputName"
              v-model="m_fullName"
              :disabled="m_disable"
              placeholder="每个字的拼音以空格隔开,全小写,最多支持三个字的名字，多个名字以逗号分开"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">昵称:</div>
          <div class="form-input auto">
            <el-input ref="inputName" v-model="m_nickname" :disabled="m_disable" placeholder="多个昵称以逗号分开"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">日期:</div>
          <div class="form-input auto">
            <el-input
              ref="inputName"
              v-model="m_datetime"
              :disabled="m_disable"
              placeholder="包括生日在内的重要日期列表,格式:19980405,多个日期以逗号分开"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">电话号码:</div>
          <div class="form-input auto">
            <el-input ref="inputName" v-model="m_phonenum" :disabled="m_disable" placeholder="多个号码以逗号分开"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">旧密码:</div>
          <div class="form-input auto">
            <el-input ref="inputName" v-model="m_oldpwd" :disabled="m_disable" placeholder="多个密码以逗号分开"></el-input>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">数字:</div>
          <div class="form-input auto">
            <el-input
              ref="inputName"
              v-model="m_number"
              :disabled="m_disable"
              placeholder="可能出现的数字，多个数字以逗号分开"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">关键词:</div>
          <div class="form-input auto">
            <el-input
              ref="inputName"
              v-model="m_keyvalue"
              :disabled="m_disable"
              placeholder="全小写,多个关键词以逗号分开"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">爱人名称:</div>
          <div class="form-input auto">
            <el-input
              ref="inputName"
              v-model="m_lovename"
              :disabled="m_disable"
              placeholder="每个字的拼音之间以空格分开，全小写,最多支持三个字的名字,多个名字以逗号分开"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">机构名称:</div>
          <div class="form-input auto">
            <el-input
              ref="inputName"
              v-model="m_organization"
              :disabled="m_disable"
              placeholder="包括工作单位,每个字的拼音以空格隔开;全小写,多个组织以逗号分开，全小写,最多支持三个字的名字,多个名字以逗号分开"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">目标QQ:</div>
          <div class="form-input auto">
            <el-input ref="inputName" v-model="m_qq" :disabled="m_disable" placeholder="多个QQ以逗号分开"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div class="auto">
        <div class="el-form-container">
          <div class="item none">逻辑值:</div>
          <div class="form-input auto">
            <el-radio-group v-model="logic">
              <el-radio label="0">0</el-radio>
              <el-radio label="1">1</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
    <div class="el-form-container">
      <el-button class="form-input none" type="primary" @click="onSelect">选择</el-button>
      <div class="form-input auto">
        <el-input ref="inputName" v-model="m_file" placeholder="请选择保存文件地址"></el-input>
      </div>
    </div>
    <div class="el-form-container">
      <el-button class="form-input none" type="primary" @click="onStart">开始</el-button>
      <el-button class="form-input none" @click="onStop">停止</el-button>
    </div>
  </div>
</template>

<script>
import { GUID } from '../../utils';
import { writeFile } from '../../service/file';
import ZmqJs from '../../service/zmq';

const { dialog } = window.require('electron').remote;
export default {
  data() {
    return {
      m_disable: false,
      labelPosition: 'right',
      m_fullName: 'alita,zhi ad',
      m_nickname: 'github',
      m_datetime: '20091010',
      m_phonenum: '15212366598',
      m_oldpwd: '8898',
      m_number: '8080',
      m_keyvalue: 'world',
      m_lovename: 'alita',
      m_organization: 'happy',
      m_qq: '123',
      logic: '0',
      m_file: '',
    };
  },
  methods: {
    onSelect() {
      dialog
        .showOpenDialog({
          title: '打开文件',
          defaultPath: '',
          properties: ['openFile', 'multiSelections'],
          filters: [
            { name: 'Text', extensions: ['txt'] },
            { name: 'All Files', extensions: ['*'] },
          ],
        })
        .then((result) => {
          console.log(result.filePaths);
          this.m_file = result.filePaths[0];
        });
    },
    onStart() {
      this.m_disable = true;

      var task = {
        id: GUID(),
        scriptid: 'aux_tool',
        parameters: {
          pocname: 'makepwd',
          fullnameList: this.m_fullName,
          nicknameList: this.m_nickname,
          dateList: this.m_datetime,
          phoneList: this.m_phonenum,
          oldpasswdList: this.m_oldpwd,
          keynumbersList: this.m_number,
          keywordsList: this.m_keyvalue,
          lovernameList: this.m_lovename,
          organizationList: this.m_organization,
          qq: this.m_qq,
          weakpasswd: this.logic === '0' ? '0' : '1',
          output: this.m_file,
        },
      };
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
.flex-container {
  overflow: hidden;
  display: flex;
}
.el-form-container {
  display: flex;
}

.auto {
  flex: auto;
}
.none {
  flex: none;
}

.item {
  margin: 10px;
  min-width: 0;
  font-size: 14px;
  width: 60px;
  align-self: center;
}
.form-input {
  margin: 10px;
}
</style>
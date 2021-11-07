<template>
  <el-form :label-position="labelPosition" label-width="80px">
    <el-form-item label="目标全名">
      <el-col :span="11">
        <el-input
          ref="inputName"
          v-model="m_fullName"
          :disabled="m_disable"
          placeholder="每个字的拼音以空格隔开,全小写,最多支持三个字的名字，多个名字以逗号分开"
        ></el-input>
      </el-col>
      <el-col class="line" :span="2">昵称</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input ref="inputName" v-model="m_nickname" :disabled="m_disable" placeholder="多个昵称以逗号分开"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="11">
        <el-input
          ref="inputName"
          v-model="m_datetime"
          :disabled="m_disable"
          placeholder="包括生日在内的重要日期列表,格式:19980405,多个日期以逗号分开"
        ></el-input>
      </el-col>
      <el-col class="line" :span="2">电话号码</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input ref="inputName" v-model="m_phonenum" :disabled="m_disable" placeholder="多个号码以逗号分开"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="旧密码">
      <el-col :span="11">
        <el-input ref="inputName" v-model="m_oldpwd" :disabled="m_disable" placeholder="多个密码以逗号分开"></el-input>
      </el-col>
      <el-col class="line" :span="2">数字</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input
            ref="inputName"
            v-model="m_number"
            :disabled="m_disable"
            placeholder="可能出现的数字，多个数字以逗号分开"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="关键词">
      <el-col :span="11">
        <el-input ref="inputName" v-model="m_keyvalue" :disabled="m_disable" placeholder="全小写,多个关键词以逗号分开"></el-input>
      </el-col>
      <el-col class="line" :span="2">爱人名称</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input
            ref="inputName"
            v-model="m_lovename"
            :disabled="m_disable"
            placeholder="每个字的拼音之间以空格分开，全小写,最多支持三个字的名字,多个名字以逗号分开"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="机构名称">
      <el-col :span="11">
        <el-input
          ref="inputName"
          v-model="m_organization"
          :disabled="m_disable"
          placeholder="包括工作单位,每个字的拼音以空格隔开;全小写,多个组织以逗号分开，全小写,最多支持三个字的名字,多个名字以逗号分开"
        ></el-input>
      </el-col>
      <el-col class="line" :span="2">目标QQ</el-col>
      <el-col :span="11">
        <el-form-item>
          <el-input ref="inputName" v-model="m_qq" :disabled="m_disable" placeholder="多个QQ以逗号分开"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="逻辑值">
      <el-radio-group v-model="logic">
        <el-radio label="0">0</el-radio>
        <el-radio label="1">1</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="保存路径">
      <p>{{ savefilepath }}</p>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onStart">开始</el-button>
      <el-button @click="onStop">停止</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GUID } from '../../utils';
import { writeFile } from '../../service/file';
import ZmqJs from '../../service/zmq';

const { app } = window.require('electron').remote;
let appDataPath = app.getPath('desktop');
let savefilepath=undefined

export default {
  data() {
    return {
      m_disable: false,
      labelPosition: 'right',
      m_fullName: 'zhi ad',
      m_nickname: 'Happy',
      m_datetime: '20091010',
      m_phonenum: '15212366598',
      m_oldpwd: '8898',
      m_number: '8080',
      m_keyvalue: 'world',
      m_lovename: 'alita',
      m_organization: 'happy',
      m_qq: '123',
      logic: '0'
    };
  },
  beforeCreate() {
    this.savefilepath = appDataPath + '\\' + 'test.txt';
    console.log(this.savefilepath);
    const buffer = '';
    writeFile(this.savefilepath, buffer, function (err) {
      if (err) {
        console.error(err);
      }
      console.info('write success');
    });
  },
  methods: {
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
          weakpasswd: this.logic==='0' ? '0' :'1',
          output: this.savefilepath,
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
.line {
  text-align: right;
  padding: 0 6px 0 0px;
}

el-form-item {
  float: left;
}
</style>
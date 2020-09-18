<template>
<div id="cdn">
  <p v-if="msg">{{title}}</p>
  <p v-else>{{primary}}</p>
  <div>
    <ol>
      <li v-for="(todo,index) in todos" :key="index">
        {{todo.text}}
      </li>
    </ol>
  </div>
  <button v-on:click="reverseMessage">反转消息</button>
  <div id="app-6">
    <input v-model="title" v-on:focus="focus">
  </div>
  <div id="app-7">
    <ol>
      <li v-for="todo in todos" :key="todo.id" v-bing:item="todo">
        {{todo.text}}
      </li>
    </ol>
  </div>
  <div>
    <p>Original message: "{{ reversemsg }}"</p>
    <p>Computed reversed message: "{{reverseMessage}}"</p>
  </div>
  <div>
    <button v-on:click="greet">Greet</button>
    <button v-on:click="say('what', $event)">Say what</button>
    <!-- https://cn.vuejs.org/v2/guide/events.html -->
    <a v-on:click.stop="greet"></a>
    <input v-on:keyup.enter="submit">
  </div>
</div>
</template>

<script>
var _data = {
  msg: true,
  title: 'hello vue js',
  reversemsg: 'Hello',
  primary: 'primary',
  todos: [{
      id: 0,
      text: 'learning JaveScript'
    },
    {
      id: 1,
      text: 'learning Vue'
    },
    {
      id: 2,
      text: 'learning Python'
    },
  ]
}

export default {
  el: '#cdn',
  data() {
    return _data
  },
  methods: {
    reverseMessage: function () {
      this.title = this.title.split('').reverse().join('')
    },
    focus: function () {
      this.title = this.title.split('').reverse().join('')
    },
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    },
    say: function (message, event) {
      if (event) {
        event.preventDefault()
      }
      alert(message)
    },
    submit(){
      alert("")
    }
  },
  //自定义属性
  props: ['item'],
  //实例被创建之后执行代码
  created() {
    this.$message('click on item ' + this.title);
  },
  computed: {
    reverseMessage: function () {
      return this.reversemsg.split('').reverse().join('')
    },
  },
  watch: {
    title: function (val) {
      this.reversemsg = val + '-'
    }
  },
}
</script>

<style scoped>
p{
  display: inline;
}
</style>

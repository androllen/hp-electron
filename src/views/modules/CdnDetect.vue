<template>
<div id="cdn">
cdn
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
}
</script>

<style scoped>
#cdn{
  height: 80%;
  width: auto;
  background: aqua;
  border: solid 6px;
}
</style>

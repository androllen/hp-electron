<template>
<div id="app">
  <div class="nav_div">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="search_div">
      <BaseSearch />
    </div>
    <div class="menu_div">
      <BaseMenu />
    </div>
  </div>

  <div class="content_div">
    <div class="history_div">
      <BaseHistory/>
    </div>
    <div class="targe_div">
      <BaseTarget />
    </div>
    <div class="console_div">
     <BaseConsole/>
    </div>
  </div>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import BaseSearch from '@/components/BaseSearch.vue';
import BaseMenu from '@/components/BaseMenu.vue';
import BaseHistory from '@/components/BaseHistory.vue';
import BaseTarget from '@/components/BaseTarget.vue';
import BaseConsole from '@/components/BaseConsole.vue';

export default {
  name: 'Shell',
  components: {
    BaseSearch,
    BaseMenu,
    BaseHistory,
    BaseTarget,
    BaseConsole
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 0px;
  min-width: 1100px;
  min-height: 700px;
}

.nav_div {
  float: left;
  width: 250px;
  height: 100%;
  position: absolute;
  background: green;
  left: 0px;
  top: 0px;
}

.search_div {
  width: auto;
  height: 50px;
  background: red;
}

.menu_div {
  width: auto;
  height: 350px;
  background: yellow;
}

.content_div {
  float: left;
  left: 250px;
  top: 0px;
  width: calc(100% - 250px);
  height: 100%;
  border: 2px solid #f00;
  border-radius: 6px;
  background: gray;
  position: absolute;
}

.history_div {
  width: auto;
  height: 37px;
  background: white;
}

.targe_div {
  width: auto;
  height: calc(80% - 37px);
  background: blanchedalmond;
}

.console_div {
  width: auto;
  height: 20%;
  background: aquamarine;
}
</style>

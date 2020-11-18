<template>
  <div class="boxside" id="shell">
    <div class="navside" id="shell">
      <img alt="Vue logo" src="../assets/logo.png" />
      <BaseSearch />
      <div id="menu">
        <BaseMenu />
      </div>
      <div class="setting"></div>
    </div>

    <div class="contentside" id="shell">
      <div class="title">
        <BaseHistory />
      </div>
      <div class="content">
        <BaseTarget />
      </div>
      <div class="logger">
        <BaseConsole />
      </div>
    </div>
  </div>
</template>

<script>
/*
 DIV高度为浏览器窗口的高度
 通过深入Document内部进行检测，获取浏览器窗口高度
*/
function autodivheight() {
  let winHeight = 0;
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  } else if (document.body && document.body.clientHeight) {
    winHeight = document.body.clientHeight;
  }
  if (document.documentElement && document.documentElement.clientHeight) {
    winHeight = document.documentElement.clientHeight;
  }
  document.getElementById('shell').style.height = winHeight + 'px';
  document.getElementById('menu').style.height = winHeight - 200 + 'px';
}
import BaseSearch from '@/components/BaseSearch.vue';
import BaseMenu from '@/components/BaseMenu.vue';
import BaseHistory from '@/components/BaseHistory.vue';
import BaseTarget from '@/components/BaseTarget.vue';
import BaseConsole from '@/components/BaseConsole.vue';

export default {
  name: 'shell',
  components: {
    BaseSearch,
    BaseMenu,
    BaseHistory,
    BaseTarget,
    BaseConsole,
  },
  mounted() {
    window.onload = () => {
      autodivheight();
    };
    window.onresize = () => {
      autodivheight();
    };
  },
};
</script>

<style>
.boxside {
  display: flex;
  overflow: hidden;
}

.navside {
  display: flex;
  flex-direction: column;
  width: 250px;
}

.contentside {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.title {
  background-color: #333;
  height: 37px;
}
.logger {
  background-color: #333;
  height: 90px;
}

.content {
  border-left-color: rgb(230, 230, 230);
  border-left-style: solid;
  border-left-width: 1px;
  overflow: hidden;
  height: 100%;
}

.setting {
  background-color: #1f3359;
  height: 60px;
}
</style>

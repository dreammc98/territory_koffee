<template>
  <my-navbar />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MyNavbar from "@/components/MyNavbar";

export default {
  name: "App",

  components: {
    MyNavbar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 0 calc(20px - (100vw - 100%)) 0 0;
}

.app {
  max-width: 1280px;
  margin: 0 auto;
}
body {
  padding: 0 calc(20px - (100vw - 100%)) 0 0;
}
</style>

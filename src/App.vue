<template>
  <my-navbar />
  <div>
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
</style>

<template>
  <div id="app">
    <BaseTopBar />

    <router-view />
  </div>
</template>

<script>
import BaseTopBar from "@/components/BaseTopBar.vue";

export default {
  name: "App",
  components: {
    BaseTopBar,
  },

  mounted() {
    this.$store.dispatch("auth/getCurrentUser");
  },
};
</script>

<style></style>

<template>
  <div id="app">
    <TopBar />

    <router-view />
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
  },

  mounted() {
    this.$store.dispatch("auth/getCurrentUser");
  },
};
</script>

<style></style>

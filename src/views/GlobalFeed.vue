<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <BaseFeed :apiUrl="apiUrl" />
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFeed from "@/components/BaseFeed.vue";
export default {
  name: "GlobalFeed",
  components: {
    BaseFeed,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>

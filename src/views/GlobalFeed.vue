<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <BaseFeed :api-url="apiUrl"></BaseFeed>
        </div>
        <div class="col-md-3">
          <BasePopularTag></BasePopularTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFeed from "@/components/BaseFeed.vue";
import BasePopularTag from "@/components/BasePopularTag.vue";

export default {
  name: "GlobalFeed",
  components: {
    BaseFeed,
    BasePopularTag,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>

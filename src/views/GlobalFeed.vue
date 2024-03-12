<template>
  <div class="home-page">
    <BaseBanner></BaseBanner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <BaseFeedToggler></BaseFeedToggler>
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
import BaseBanner from "@/components/BaseBanner.vue";
import BaseFeedToggler from "@/components/BaseFeedToggler";

export default {
  name: "GlobalFeed",
  components: {
    BaseFeed,
    BasePopularTag,
    BaseBanner,
    BaseFeedToggler,
  },
  data() {
    return {
      apiUrl: "/articles",
    };
  },
};
</script>

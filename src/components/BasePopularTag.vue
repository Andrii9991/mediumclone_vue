<template>
  <div>
    <BaseLoading v-if="isLoading"></BaseLoading>
    <BaseError v-if="error"></BaseError>

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{ name: 'tag', params: { slug: popularTag } }"
          class="tag-default tag-pill"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseLoading from "./BaseLoading.vue";
import BaseError from "./BaseError.vue";

export default {
  name: "BasePopularTag",
  components: {
    BaseLoading,
    BaseError,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.data,
      error: (state) => state.popularTags.error,
    }),
  },

  mounted() {
    this.$store.dispatch("popularTags/getPopularTags");
  },
};
</script>

<template>
  <div class="global-feed">
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happend</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image"
          /></router-link>
          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.usrname }}
              /></router-link
            >
            <span class="date"> {{ article.createdAt }} </span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          class="preveiw-link"
          :to="{ name: 'article', params: { slug: article.slug } }"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      PAGINATION
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BaseFeed",
  props: {
    apiUrl: {
      type: String,
      require: true,
    },
  },
  computed: {
    ...mapState({
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
      isLoading: (state) => state.feed.isLoading,
    }),
  },
  mounted() {
    this.$store.dispatch("feed/getFeed", { apiUrl: this.apiUrl });
  },
};
</script>

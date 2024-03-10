<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happed</div>
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
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <BasePagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import BasePagination from "@/components/BasePagination";
import { mapState } from "vuex";
import { limit } from "@/helper/vars";
import { parseUrl, stringify } from "query-string";

export default {
  name: "BaseFeed",
  components: {
    BasePagination,
  },
  props: {
    apiUrl: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      limit,
    };
  },
  computed: {
    ...mapState({
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
      isLoading: (state) => state.feed.isLoading,
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parseUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

      this.$store.dispatch("feed/getFeed", { apiUrl: apiUrlWithParams });
    },
  },

  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
};
</script>

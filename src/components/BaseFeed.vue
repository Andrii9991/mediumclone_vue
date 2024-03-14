<template>
  <div>
    <BaseLoading v-if="isLoading" />
    <BaseError v-if="error" />

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
          <BaseTagList :article="article"></BaseTagList>
        </router-link>
      </div>
      <BasePagination
        :total="feed.articlesCount"
        :limit="limit"
        :url="baseUrl"
        :current-page="currentPage"
      ></BasePagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { stringify, parseUrl } from "query-string";
import { limit } from "@/helper/vars";
import BasePagination from "@/components/BasePagination";
import BaseLoading from "@/components/BaseLoading";
import BaseError from "@/components/BaseError";
import BaseTagList from "@/components/BaseTagList";

export default {
  name: "BaseFeed",
  components: {
    BasePagination,
    BaseLoading,
    BaseError,
    BaseTagList,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    limit() {
      return limit;
    },
    baseUrl() {
      return this.$route.path;
    },
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch("feed/getFeed", { apiUrl: apiUrlWithParams });
    },
  },
};
</script>

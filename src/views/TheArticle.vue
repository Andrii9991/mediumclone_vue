<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
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
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i>
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <BaseLoading v-if="isLoading" />
      <BaseError v-if="isLoading" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <BaseTagList :article="article"></BaseTagList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseError from "@/components/BaseError.vue";
import BaseTagList from "@/components/BaseTagList.vue";

export default {
  name: "TheArticle",
  components: {
    BaseLoading,
    BaseError,
    BaseTagList,
  },
  props: {},
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
      article: (state) => state.article.data,
    }),
    ...mapGetters("auth", ["currentUser"]),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
  },

  methods: {
    deleteArticle() {
      this.$store
        .dispatch("article/deleteArticle", {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$route.push({ name: "globalFeed" });
        });
    },
  },
  mounted() {
    this.$store.dispatch("article/getArticle", {
      slug: this.$route.params.slug,
    });
  },
};
</script>

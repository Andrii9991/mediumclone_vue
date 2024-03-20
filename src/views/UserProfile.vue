<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" alt="img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                v-if="isCurrentUserProfile"
                :to="{ name: 'settings' }"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: routeName === 'userProfile' }"
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  >My Post</router-link
                >
                <router-link :to="{ name: 'userProfile' }"></router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  >Favorites Posts</router-link
                >
                <router-link :to="{ name: 'userProfile' }"></router-link>
              </li>
            </ul>
          </div>
          <BaseFeed :apiUrl="apiUrl"></BaseFeed>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BaseFeed from "@/components/BaseFeed.vue";
export default {
  name: "UserProfile",
  components: {
    BaseFeed,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      userProfile: (state) => state.userProfile.data,
      error: (state) => state.userProfile.error,
    }),
    ...mapGetters("auth", ["currentUser"]),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes("favorites");
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    routeName() {
      return this.$route.name;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
  },

  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },

  methods: {
    getUserProfile() {
      this.$store.dispatch("userProfile/getUserProfile", {
        slug: this.userProfileSlug,
      });
    },
  },

  mounted() {
    this.getUserProfile();
  },
};
</script>

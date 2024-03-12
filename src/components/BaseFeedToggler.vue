<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          class="nav-link"
          :to="{ name: 'yourFeed' }"
          :class="{ active: routeName === 'yourFeed' }"
          >Your Feed</router-link
        >
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{ name: 'globalFeed' }"
          :class="{ active: routeName === 'globalFeed' }"
          >Global Feed</router-link
        >
      </li>

      <li class="nav-item" v-if="tagName">
        <router-link
          class="nav-link"
          :to="{ name: 'tag' }"
          :class="{ active: routeName === 'tag' }"
          ><i class="ion-pound"></i> {{ tagName }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseFeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },

  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
    routeName() {
      return this.$route.name;
    },
  },
};
</script>

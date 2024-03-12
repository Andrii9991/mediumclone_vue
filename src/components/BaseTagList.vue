<template>
  <div>
    <ul class="tag-list">
      <li
        class="tag-default tag-pill tag-outline"
        v-for="tag in article.tagList"
        :key="tag"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BaseTagList",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

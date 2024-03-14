<template>
  <div>
    <BaseArticleForm
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    ></BaseArticleForm>
  </div>
</template>

<script>
import BaseArticleForm from "@/components/BaseArticleForm";
import { mapState } from "vuex";
export default {
  name: "CreateArticle",
  components: {
    BaseArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },

  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch("createArticle/createArticle", articleInput)
        .then((article) => {
          this.$route.push({ name: "article", params: { slag: article.slug } });
        });
      console.log(articleInput);
    },
  },
};
</script>

<style></style>

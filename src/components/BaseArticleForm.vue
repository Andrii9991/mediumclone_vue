<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <BaseValidationErrors
            v-if="errors"
            :BaseValidationErrors="errors"
          ></BaseValidationErrors>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Article title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control form-control-lg"
                  placeholder="What is this article about?"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tagList"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Enter tags"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseValidationErrors from "@/components/BaseValidationErrors.vue";
export default {
  name: "BaseArticleForm",
  components: {
    BaseValidationErrors,
  },
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      title: "",
      description: "",
      body: "",
      tagList: "",
    };
  },

  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(),
      };
      this.$emit("articleSubmit", form);
    },
  },

  mounted() {
    console.log(this.errors);
  },
};
</script>

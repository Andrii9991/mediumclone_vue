<template>
  <ul class="error-messages">
    <li v-for="error in errorMessages" :key="error">
      {{ error }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "BaseValidationErrors",
  props: {
    BaseValidationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.BaseValidationErrors).map((name) => {
        const messages = this.BaseValidationErrors[name].join(",");
        return `${messages}`;
      });
    },
  },
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <BaseValidationErrors
            v-if="BaseValidationErrors"
            :BaseValidationErrors="BaseValidationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseValidationErrors from "@/components/BaseValidationErrors.vue";

export default {
  components: {
    BaseValidationErrors,
  },
  name: "RegisterPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      BaseValidationErrors: (state) => state.auth.BaseValidationErrors,
    }),
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch("auth/register", {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
};
</script>

<template>
  <div class="login-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Login</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
          <BaseValidationErrors
            v-if="BaseValidationErrors"
            :BaseValidationErrors="BaseValidationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group"></fieldset>
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
  name: "LoginPage",
  data() {
    return {
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
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
};
</script>

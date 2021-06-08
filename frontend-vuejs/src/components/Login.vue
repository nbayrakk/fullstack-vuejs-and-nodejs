<template>
  <div>
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-light border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"> </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <div v-if="errors">
                  <b-alert variant="danger"  v-for="(v, k) in errors" :key="k" show> {{v}} </b-alert>
              </div>
              <div class="row">
                <div class="col-md-12 col-xs-12">
                  <h1 class="text-xs-center">Sign in</h1>
                  <p class="text-xs-center">
                    <!-- <router-link :to="{ name: 'register' }">
                      Need an account?
                    </router-link> -->
                  </p>

                  <form>
                    <fieldset class="form-group">
                      <input
                        class="form-control form-control-lg"
                        type="text"
                        v-model="email"
                        placeholder="Email"
                      />
                    </fieldset>
                    <fieldset class="form-group">
                      <input
                        class="form-control form-control-lg"
                        type="password"
                        v-model="password"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button
                      @click="onSubmit(email, password)"
                      class="btn btn-lg btn-primary pull-xs-right"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              >
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "nafizbay1@hotmail.com",
      password: "123456",
    };
  },
  methods: {
    onSubmit(email, password) {
      let user = {
        email: email,
        password: password,
      };
      console.log(user);
      this.$store
        .dispatch("login", user)
        .then(() => this.$router.push({ name: "home" }))
        .catch(() => {
          return;
        });
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
  },
  created() {},
};
</script>

<style></style>

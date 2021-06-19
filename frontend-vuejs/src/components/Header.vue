<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link style="color:white"
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
        Task-Man VueJs-NodeJs
          </router-link>
        </b-navbar-brand>
      

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="isAuthenticated"  class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>
                {{getUser.name}}
              </em>
            </template>
            <b-dropdown-item @click="openProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Header",
  computed: {
    ...mapGetters(["isAuthenticated","getUser"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(this.$router.push({ name: "login" }));
    },
    openProfile() {
      console.log(this.$store.state.auth.user);
      let currentUser = this.$store.state.auth.user;
      this.$router.push({ name: "profile",params:{userId:this.getUser.id} });
    },
  },
  created() {
  },
};
</script>

<style></style>

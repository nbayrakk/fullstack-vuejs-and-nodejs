<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <router-link
          style="color: white"
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
        <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>
                {{ getUser.name }}
              </em>
            </template>
            <b-dropdown-item v-b-modal.modal-1>Add New Task</b-dropdown-item>
            <b-modal
              hide-footer
              ref="new-task-modal"
              id="modal-1"
              title="Add New Task"
            >
            <p v-if="errors.length">
              <ul>
                <b-alert v-for="(error,index) in this.errors" variant="danger" :key="index" show>{{ error }}</b-alert>

                <!-- <li v-for="(error,index) in this.errors" :key="index">{{ error }}</li> -->
              </ul>
            </p>
              <form action=""
              @submit="newTaskForm"
              
              >
                <div class="row" style="padding: 10px">
                  <div class="col-md-3">
                    <label style="align-self: center">Task Title:</label>
                  </div>
                  <div class="col-md-9">
                    <b-form-input
                      v-model="taskTitle"
                      placeholder="Enter task title"
                    ></b-form-input>
                  </div>
                </div>
                <div class="row" style="padding: 10px">
                  <div class="col-md-3">
                    <label style="align-self: center">Task Detail:</label>
                  </div>
                  <div class="col-md-9">
                    <b-form-input
                      v-model="taskDetail"
                      placeholder="Enter task detail"
                    ></b-form-input>
                  </div>
                </div>
                <div class="row">
                  <b-button
                    variant="outline-success"
                    @click="newTaskForm"
                    block
                    class="mt-3"
                    >Add New Task</b-button
                  >
                  <b-button
                    variant="outline-danger"
                    @click="hideModal"
                    block
                    class="mt-3"
                    >Close Me</b-button
                  >
                </div>
              </form>
            </b-modal>
            <b-dropdown-item @click="openProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters(["isAuthenticated", "getUser"]),
  },
  data() {
    return {
      taskTitle: "",
      taskDetail: "",
      errors: [],
    };
  },
  methods: {
    newTaskForm(e) {
      if (this.taskTitle && this.taskDetail) {
        this.addNewTask();
        return true;
      }
      this.errors = [];

      if (!this.taskTitle) {
        this.errors.push("Task title is required!");
      }
      if (!this.taskDetail) {
        this.errors.push("Task detail is required!");
      }
      e.preventDefault();
    },

    logout() {
      this.$store.dispatch("logout").then(this.$router.push({ name: "login" }));
    },
    openProfile() {
      let currentUser = this.$store.state.auth.user;
      this.$router.push({
        name: "profile",
        params: { userId: this.getUser.id },
      });
    },
    hideModal() {
      this.$refs["new-task-modal"].hide();
    },
    addNewTask() {
      let newTask = {
        title: this.taskTitle,
        detail: this.taskDetail,
      };
      this.$store.dispatch("newTask", newTask).then(()=>
        this.taskTitle= "",
        this.taskDetail="",
      )
    },
  },
  created() {},
};
</script>

<style></style>

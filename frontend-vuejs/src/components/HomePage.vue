<template>
  <div class="hello">
    <div
      class="col-md-3"
      style="display:inline-block"
      v-for="task in getTasks"
      v-bind:key="task._id"
    >

      <div style="padding:10px">
        <Task :task="task" />
      </div>
    </div>
    <div style="justify-content:center;padding:10px" class="row">
      <b-form-input class="col-sm-3" v-model="title"> </b-form-input>
      <b-form-input class="col-sm-3" style="margin-left:15px" v-model="detail">
      </b-form-input>
      <b-button @click="addTask" style="margin-left:15px">Add</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Task from "./Task";
export default {
  name: "Homepage",
  components: {
    Task,
  },
  props: {},
  data() {
    return {
      title: "",
      detail: "",
    };
  },
  methods: {
    ...mapActions(["fetchTasks"]),
    addTask() {
      const newTask = {
        title: this.title,
        detail: this.detail,
      };
      this.$store.dispatch("newTask", newTask);
    }
  },
  computed: {
    ...mapGetters(["getTasks"]),
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped></style>

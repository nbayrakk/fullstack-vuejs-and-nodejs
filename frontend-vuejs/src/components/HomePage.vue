<template>
  <div class="hello" style="padding:10px">
    <div
      class="col-md-3 table-row"
      style="display:inline-block"
      v-for="task in getTasks"
      v-bind:key="task._id"
    >

      <div style="padding:10px" class=" table-row">
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
      this.$store.dispatch("newTask", newTask)
      .then(()=>{
        this.title =''
        this.detail=''
      })
    }
  },
  computed: {
    ...mapGetters(["getTasks","currentUser"]),
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.table-row:nth-of-type(odd) {
}
.table-row:nth-of-type(even) {
  background: #edf1f7;
}
</style>

<template>
  <div>
    <b-col>
      <div style="padding: 10px">
        <b-form-input v-if="this.getUser.id==this.task.user._id" v-model="task.title"> </b-form-input>
        <label v-if="this.getUser.id!=this.task.user._id"> {{task.title}} </label>
      </div>
      <div style="padding: 10px">
        <b-form-input v-if="this.getUser.id==this.task.user._id" v-model="task.detail"> </b-form-input>
        <label v-if="this.getUser.id!=this.task.user._id"> {{task.detail}} </label>
      </div>
    </b-col>
    <b-row style="justify-content: center">
      <div style="padding: 5px">
        <b-button v-if="this.getUser.id==this.task.user._id" @click="deleteTask" variant="danger"
          >Delete</b-button
        >
      </div>
      <!-- <div style="padding: 5px">
        <b-button @click="updateDetail">Update</b-button>
      </div> -->
      <div style="padding: 5px">
        <b-button @click="openDetail" variant="success">Detail</b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Task",
  props: {
    task: Object,
  },
  data() {
    return {
      currentUserId: String,
    };
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task._id).then((response) => {
        this.$store.dispatch("fetchTasks").then(
          this.$bvToast.toast(`Deleted successful!`, {
            title: "",
            variant: "success",
            autoHideDelay: 10000,
            appendToast: true,
            solid: true,
          })
        );
      });
    },
    updateDetail() {},

    openDetail() {
      this.$router.push({
        name: "detail",
        params: { slug: this.task.slug, taskId: this.task._id },
      });
    },

    
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created() {},
};
</script>

<style scoped>
.todo-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

.is-complete {
  text-decoration: line-through;
}
</style>

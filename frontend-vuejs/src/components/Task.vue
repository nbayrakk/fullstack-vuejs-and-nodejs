<template>
  <div>
    <p>
      <b-col>
        <div style="padding: 10px">
          <b-form-input v-model="task.title"> </b-form-input>
        </div>
        <div style="padding: 10px">
          <b-form-input v-model="task.detail"> </b-form-input>
        </div>
      </b-col>
      <b-row style="justify-content: center">
        <div style="padding: 5px">
          <b-button @click="deleteTask" variant="danger">Delete</b-button>
        </div>
        <div style="padding: 5px">
          <b-button @click="updateDetail">Update</b-button>
        </div>
        <div style="padding: 5px">
          <b-button @click="openDetail" variant="success">Detail</b-button>
        </div>
      </b-row>
    </p>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task._id).then((response) => {
        this.$store.dispatch("fetchTasks").then(
          this.$bvToast.toast(`Deleted successful!`, {
            title: "",
            variant:'success',
            autoHideDelay:10000
          })
        );
      });
    },
    updateDetail() {},

    openDetail() {
      console.log(this.task);
      this.$router.push({
        name: "detail",
        params: { slug: this.task.slug, taskId: this.task._id },
      });
    },
  },
  computed: {},
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

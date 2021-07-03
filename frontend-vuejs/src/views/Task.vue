<template>
  <div>
    <b-col>
      <div class="row" style="padding: 10px">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-3">
              <label style="font-weight: bold"> Task Title: </label>
            </div>
            <div style="text-align: left" class="col-md-9">
              <label>
                {{ task.title }}
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label style="font-weight: bold"> Task Detail: </label>
            </div>
            <div style="text-align: left" class="col-md-9">
              <label for="">
                {{ task.detail }}
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div style="padding: 5px">
            <b-button @click="openDetail" variant="success">Detail</b-button>
          </div>
          <div>
            <div class="icon-style row">
              <b-icon
                @click="likeTask(task)"
                class="h5 mb-12 icon-style"
                v-bind:icon="hasLike(task)"
                style="margin: 0px; cursor: pointer"
              >
              </b-icon>
              {{ task.likes.length }}
            </div>
            <div class="icon-style">
              <b-icon
                class="h5 mb-12 icon-style"
                style="margin-left: 30px; margin-bottom: 0px"
                icon="chat-dots"
              ></b-icon>
              {{ task.alerts.length }}
            </div>
          </div>

          <!-- MOVE IN DETAIL -->
          <!-- <div style="padding: 5px">
            <b-button
              v-if="this.getUser.id == this.task.user._id"
              @click="deleteTask"
              variant="danger"
              >Delete</b-button
            >
          </div> -->
        </div>
      </div>
    </b-col>
    <b-row style="justify-content: center"> </b-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
    hasLike(task) {
      let hasUserId = task.likes.includes(this.getUser.id);
      if (hasUserId) return "heart-fill";
      else return "heart";
    },
    likeTask(task) {
      console.log(task);
      if (!task.likes.includes(this.getUser.id)) {
        this.$store.dispatch("likeTask", task._id);
      } else {
        this.$store.dispatch("unlikeTask", task._id);
      }
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
    ...mapState(["user"]),
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
.icon-style {
  display: inline-block;
  text-align: center;
  /* margin-left: 50%; */
}
</style>

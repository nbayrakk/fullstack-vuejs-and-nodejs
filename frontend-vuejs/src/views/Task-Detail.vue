<template>
  <div>
    <div>
      <b-spinner v-if="!hasTask" label="Loading..."></b-spinner>
    </div>
    <div v-if="hasTask">
      <b-container
        style="border:1px solid #ccc;border-radius:10px;margin-top:1%"
        class="bv-example-row"
      >
        <div class="table-header">
          <div class="col-md-6">
            <div class="row">
              <div style="align-self:center" class="col-md-3">
                <label for="">Task Title:</label>
              </div>
              <div class="col-md-9">
                <label style="float:left;padding:5px">
                  {{ task.title }}
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div style="align-self:center" class="col-md-3">
                <label for="">Task Detail:</label>
              </div>
              <div class="col-md-9">
                <label style="float:left;padding:5px">
                  {{ task.detail }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div
          class="table-row"
          v-bind:key="index"
          v-for="(alert, index) in task.alerts"
        >
          <div class="col-md-12 col-style row">
            <div class="col-md-3">
              <div class="col-md-12 col-style">
                <div class="col-md-4">
                  <img src="@/assets/logo.png" style="width:100%;heigth:100%" />
                </div>
                <div class="col-md-8">
                  <label for="">
                    {{ alert.user.name }}
                  </label>
                  <label class="date-style">
                    {{ alert.createdAt | moment("dd, MMMM Do YY hh:mm:ss") }}
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-9" style="display:flex">
              {{ alert.content }}
            </div>
          </div>
        </div>
        <hr />

        <div class="row" style="padding:20px">
          <b-form-input
            v-model="alertContent"
          ></b-form-input>
        </div>
        <div
          class="row"
          style="display: flex;padding-right: 20px;padding-bottom: 20px;justify-content: flex-end;"
        >
          <b-button style="float:right" @click="addAlert()" variant="success"
            >Send Alert</b-button
          >
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Task-Detail",
  props: {
    taskId: String,
    vm: Object,
  },
  data() {
    return {
      alertContent: "",
      hasTask: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(vm);
      vm.fetchTask();
    });
  },
  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch("resetTaskAction");

    next();
  },
  computed: {
    getHasTask() {
      return this.hasTask;
    },
    ...mapGetters({
      task: "getTask",
    }),
  },
  created() {
    this.user = undefined;
    // this.fetchTask()
  },
  watch: {},
  methods: {
    // ...mapActions(["fetchTask"]),

    fetchAlert() {
      this.$store.dispatch("fetchAlert", this.taskId);
    },
    async fetchTask() {
      this.hasTask = false;
      await this.$store.dispatch("fetchTask", this.taskId);
      this.hasTask = true;
    },
    resetTask() {
      this.$store.dispatch("resetTaskAction");
    },
    addAlert() {
      let data = {
        content: { content: this.alertContent },
        taskId: this.taskId,
      };
      if (!this.alertContent) {
        this.$bvToast.toast(` `, {
          title: "Alert content is required!",
          variant: "danger",
          autoHideDelay: 10000,
          appendToast: true,
          solid: true,
        });
        return;
      }
      this.$store.dispatch("postAlert", data).then(() => {
        // this.$store.dispatch("fetchTask", this.taskId);
        this.fetchTask(this.taskId);
        this.alertContent = "";
      });
    },
  },
};
</script>

<style scoped>
.col-style {
  display: flex;
}
.table-row:nth-of-type(odd) {
  background: #fff;
}
.table-row:nth-of-type(even) {
  background: #edf1f7;
}
.date-style {
  font-size: 0.74rem;
}
.table-header {
  display: flex;
  width: 100%;
  background-color: #edf1f7;
  font-size: 14px;
  font-weight: bold;
  
}
.table-header div {
  padding: 10px;
}
.table-body {
  display: inline-block;
  width: 100%;
  overflow: auto;
}
.table-row {
  width: 100%;
  display: flex;
  float: none;
}
.table-row.active {
  border: 1px solid #3366ff;
  background: #1182fbcc !important;
  color: white;
  font-weight: bold;
}
.table-row:nth-of-type(odd) {
  background: #fff;
      border-radius: 20px;

}

.table-row:nth-of-type(even) {
  background: #edf1f7;
      border-radius: 20px;

}
.table-row.info {
  background-color: #e0ebf9;
}

.table-row div {
  font-size: 14px;
  padding: 10px;
}
</style>

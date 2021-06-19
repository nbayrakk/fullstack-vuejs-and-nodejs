<template>
  <div>
    <b-container
      style="border:1px solid #ccc;border-radius:10px"
      class="bv-example-row"
    >
      <b-row class="row">
        <div style="align-self:center" class="col-md-2">
          <label for="">Task Title:</label>
        </div>
        <div class="col-md-10">
          <b-col>
            <label style="float:left;padding:5px">
              {{ task.title }}
            </label>
          </b-col>
        </div>
      </b-row>

      <b-row>
        <div style="align-self:center" class="col-md-2">
          <label for="">Task Detail:</label>
        </div>
        <div class="col-md-10">
          <b-col>
            <label style="float:left;padding:5px">
              {{ task.detail }}
            </label>
          </b-col>
        </div>
      </b-row>
      <hr />
      <b-row
        class="table-row"
        v-bind:key="index"
        v-for="(alert, index) in task.alerts"
      >
        <b-col>
          <div class="row">
            <div class="col-md-12 col-style">
              <div class="col-md-3">
                <div class="col-md-12 col-style">
                  <div class="col-md-4">
                    <img style="width:100%;heigth:100%" />
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
        </b-col>
      </b-row>
      <div style="padding:20px">
        <b-row>
          <b-form-input v-model="alertContent"></b-form-input>
          <div class="row">
            <b-button @click="addAlert()" variant="success">Detail</b-button>
          </div>
        </b-row>
      </div>
      <hr />
    </b-container>
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
    };
  },
  computed: {
    ...mapGetters({
      task: "getTask",
    }),
  },
  created() {
    this.$store.dispatch("fetchAlert", this.taskId);
    this.$store.dispatch("fetchTask", this.taskId);
  },
  methods: {
    ...mapActions(["fetchTask"]),

    addAlert() {
      let data = {
        content: { content: this.alertContent },
        taskId: this.taskId,
      };
      this.$store.dispatch("postAlert", data).then(() => {
        // this.$store.dispatch("fetchTask", this.taskId);
        this.fetchTask(this.taskId)
      this.alertContent = ''

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
</style>

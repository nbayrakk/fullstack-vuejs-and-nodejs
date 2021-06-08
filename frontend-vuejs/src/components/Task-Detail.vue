<template>
  <div>
    <b-container
      style="border:1px solid #ccc;border-radius:10px"
      class="bv-example-row"
    >
      <b-row>
        <b-col>
          <label style="float:left;padding:5px">
            {{ task.title }}
          </label>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="background-color:rgb(231, 233, 235)">
          <label style="float:left;padding:5px">
            {{ task.detail }}
          </label>
        </b-col>
      </b-row>
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
                    <label class="date-style" >
                      {{
                        alert.createdAt | moment("dd, MMMM Do YY hh:mm:ss")
                      }}
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
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Task-Detail",
  props: {
    taskId: String,
    task: Object,
    vm: Object,
  },
  computed: {
    ...mapGetters({
      task: "getTask",
    }),
  },
  created() {
    this.$store.dispatch("fetchTask", this.taskId);
  },
    methods:{
        logout(){
            this.$store.dispatch('logout')
            .then(()=> this.$router.push({ name: "login" }))
        }
    }
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

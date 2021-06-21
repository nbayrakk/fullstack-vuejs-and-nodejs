<template>
  <div style="padding:10px">
    <div
      class="col-md-3 table-row"
      style="display:inline-block"
      v-for="task in getTasks"
      v-bind:key="task._id"
    >
      <div style="padding:10px">
        <Task :task="task" />
      </div>
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
  },
  computed: {
    ...mapGetters(["getTasks", "currentUser"]),
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.table-row:nth-of-type(odd) {
  background: #edf7f6;
}
.table-row:nth-of-type(even) {
  background: #b4dbd76e

}
.iokul-table-header {
  display: flex;
  width: 100%;
  background-color: #edf1f7;
  font-size: 14px;
  font-weight: bold;
}
.iokul-table-header div {
  padding: 10px;
  display: inline-block;
  border: 1px solid #e4e9f1;
}
.iokul-table-body {
  display: inline-block;
  width: 100%;
  overflow: auto;
}
.iokul-table-row {
  width: 100%;
  display: flex;
  float: none;
}
.iokul-table-row.active {
  border: 1px solid #3366ff;
  background: #1182fbcc !important;
  color: white;
  font-weight: bold;
}
.iokul-table-row:nth-of-type(odd) {
  background: #fff;
}

.iokul-table-row:nth-of-type(even) {
  background: #edf1f7;
}
.iokul-table-row.info {
  background-color: #e0ebf9;
}

.iokul-table-row div {
  font-size: 14px;
  display: inline-block;
  padding: 10px;
  border: 1px solid #edf1f7;
}
</style>

<template>
  <div >
    <div  class="container" style="padding:20px">
      <img class="img-style" />
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 25rem; border-radius:20px;"
        class="mb-4"
      >
        <b-card-text>
          <div class="row">
            <div style="align-self:center" class="col-sm-4">
              <label class="label-style">Full Name:</label>
            </div>
            <div class="col-sm-8">
              <label v-if="!activeEdit" for="" style="float:left">
                {{ user.name }}
              </label>
              <b-form-input
                v-if="activeEdit"
                v-model="user.name"
                placeholder="Enter your email"
              ></b-form-input>
            </div>
          </div>
          <div class="row">
            <div style="align-self:center" class="col-sm-4">
              <label class="label-style">E-mail:</label>
            </div>
            <div class="col-sm-8">
              <label v-if="!activeEdit" for="" style="float:left">
                {{ user.email }}
              </label>
              <b-form-input
                v-if="activeEdit"
                v-model="user.email"
                placeholder="Enter your email"
              ></b-form-input>
            </div>
          </div>
        </b-card-text>

        <b-button @click="eventProfile()" variant="primary">{{
          changeButtonText()
        }}</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Profile",
  props: {},
  data() {
    return {
      buttonText: "",
      activeEdit: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "currentUser",
      anotherUser:"getUser"
    }),
  },
  created() {
    console.log(this.$store.state.auth.user)
    console.log(this.$store.getters)
  },
  methods: {
    
    eventProfile() {
      if (this.activeEdit) {
        this.$store.dispatch("editUser", this.user);
      } else {
        this.activeEdit = true
      }
    },
    changeButtonText() {
      this.activeEdit
        ? (this.buttonText = "Save Changes")
        : (this.buttonText = "Edit My Profile");
      return this.buttonText;
    },
  },
};
</script>

<style scoped>
.card-img {
  border-radius: 20px;
}
.container {
  display: flex;
  justify-content: center;
}
.label-style {
  float: left;
}
.row {
  padding: 0.75rem;
}
</style>

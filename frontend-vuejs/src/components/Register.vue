<template>
  <div>
      <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-light border-0 mb-0">
            <b-card-header class="bg-transparent pb-5"> </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              
              <div class="row">
                <div class="col-md-12  col-xs-12">
                  <h1 class="text-xs-center">Create Account</h1>
                  <p class="text-xs-center">
                  </p>
                  <div v-if="errors">
                  <b-alert variant="danger"  v-for="(v, k) in errors" :key="k" show> {{v}} </b-alert>
              </div>
                  <form >
                      <fieldset class="form-group">
                      <input
                        class="form-control form-control-lg"
                        type="text"
                        v-model="fullName"
                        placeholder="Full Name"
                      />
                    </fieldset>
                    <fieldset class="form-group">
                      <input
                        class="form-control form-control-lg"
                        type="text"
                        v-model="email"
                        placeholder="Email"
                      />
                    </fieldset>
                    <fieldset class="form-group">
                      <input
                        class="form-control form-control-lg"
                        type="password"
                        v-model="password"
                        placeholder="Password"
                      />
                    </fieldset>
                    
                    <button @click="onSubmit(password,email,fullName)" class="btn btn-lg btn-primary pull-xs-right">
                      Create Account
                    </button>
                  </form>
                </div>
              </div>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"Register",
    data(){
        return {
            password:'',
            email:'',
            fullName:'',
        }
    },
    methods:{
        onSubmit(pasword,email,fullName){
            const user = {
                password:pasword,
                email:email,
                name:fullName
            }
            this.$store.dispatch('register',user)
        .then(() => this.$router.push({ name: "home" }));

        }
    },
    computed:{
        ...mapState({
            errors:state=>state.auth.errors
        })
    }
}
</script>

<style scoped>

</style>
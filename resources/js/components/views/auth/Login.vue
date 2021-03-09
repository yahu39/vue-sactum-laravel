<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="form.email"
                    :error-messages="errors.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.password"
                    :error-messages="errors.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/register" class="ml-3"
                  >Dont have an account ?</router-link
                >
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="doLogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      isLoading: "false", // red
      form: {
        email: "",
        password: "",
        device_name: "browser", // 'ios/android'
      },
      errors: {},
    };
  },
  methods: {
    doLogin() {
      this.isLoading = "red";
      axios
        .post("/api/login", this.form)
        .then((response) => {
          localStorage.setItem("token", response.data); //we store our token in localstorage
          this.$router.push("/dashboard"); // if sign in success
        })
        .catch((errors) => {
          this.errors = errors.response.data.errors;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

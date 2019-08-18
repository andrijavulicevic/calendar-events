<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                label="Email"
                data-vv-name="email"
                required
                @focus="onFocus"
                @keydown.enter="login"
              ></v-text-field>

              <v-text-field
                type="password"
                v-model="password"
                v-validate="'required|min:4'"
                :error-messages="errors.collect('password')"
                label="Password"
                data-vv-name="password"
                required
                @focus="onFocus"
                @keydown.enter="login"
              ></v-text-field>

              <v-layout v-if="error" class="mt-3">
                <span class="red--text">{{ error }}</span>
              </v-layout>

              <v-layout justify-end align-end>
                <v-flex>
                  <v-layout justify-start>
                    <router-link to="/register">
                      Create account
                    </router-link>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout justify-end>
                    <v-btn class="ml-5 mt-5" @click="login" :loading="loading"
                      >Login</v-btn
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGIN, RESET_ERROR } from "../store/actions.type";

export default {
  data: () => ({
    email: "",
    password: ""
  }),
  computed: {
    ...mapGetters({
      error: "getError",
      loading: "getAuthLoading"
    })
  },
  methods: {
    login() {
      this.$validator.validate().then(valid => {
        if (!valid) return;
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch(LOGIN, user);
      });
    },
    onFocus() {
      this.$store.dispatch(RESET_ERROR);
    }
  }
};
</script>

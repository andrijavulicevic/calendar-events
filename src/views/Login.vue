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
                name="email"
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
                name="password"
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
                <span class="red--text" data-cy="login-error">{{ error }}</span>
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
                    <v-btn
                      class="ml-5 mt-5"
                      data-cy="login-btn"
                      @click="login"
                      :loading="loading"
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
import { GET_AUTH_ERROR, GET_AUTH_LOADING } from "../store/getters.type";

export default {
  data: () => ({
    email: "",
    password: ""
  }),
  computed: {
    ...mapGetters({
      error: GET_AUTH_ERROR,
      loading: GET_AUTH_LOADING
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

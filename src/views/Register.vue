<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register form</v-toolbar-title>
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
                @keydown.enter="register"
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
                ref="password"
                @focus="onFocus"
                @keydown.enter="register"
              ></v-text-field>

              <v-text-field
                name="confirmPassword"
                type="password"
                v-model="confirmPassword"
                v-validate="'required|confirmed:password'"
                :error-messages="errors.collect('confirmPassword')"
                label="Confirm password"
                data-vv-name="confirmPassword"
                data-vv-as="confirm password"
                required
                @focus="onFocus"
                @keydown.enter="register"
              ></v-text-field>

              <v-layout v-if="error" class="mt-3">
                <span class="red--text" data-cy="register-error">{{
                  error
                }}</span>
              </v-layout>

              <v-layout justify-end align-end>
                <v-flex>
                  <v-layout justify-start>
                    <router-link to="/login">
                      Back to Login
                    </router-link>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-layout justify-end="">
                    <v-btn
                      class="mt-5"
                      data-cy="register-btn"
                      @click="register"
                      :loading="loading"
                      >Register</v-btn
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
import { REGISTER, RESET_ERROR } from "../store/actions.type";
import { GET_AUTH_ERROR, GET_AUTH_LOADING } from "../store/getters.type";

export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassword: ""
  }),
  computed: {
    ...mapGetters({
      error: GET_AUTH_ERROR,
      loading: GET_AUTH_LOADING
    })
  },
  methods: {
    register() {
      this.$validator.validate().then(valid => {
        if (!valid) return;
        const newUser = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        this.$store.dispatch(REGISTER, newUser);
      });
    },
    onFocus() {
      this.$store.dispatch(RESET_ERROR);
    }
  }
};
</script>

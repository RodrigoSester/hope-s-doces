<template>
  <q-page class="login">
    <div class="q-pa-md fixed-center justify-center">
      <h1 class="login__title">{{ $t("title") }}</h1>
      <q-card class="rounded-borders">
        <q-card-section>
          <q-form @submit="login">
            <span class="input"> {{ $t("common.fields.email") }}* </span>
            <q-input
              outlined
              v-model="email"
              type="email"
              class="q-mb-md"
              :rules="emailRules"
            />
            <span class="input"> {{ $t("common.fields.password") }}* </span>
            <q-input
              v-model="password"
              type="password"
              outlined
              class="q-mb-md"
              :rules="rules"
            />
            <div class="row justify-around">
              <q-btn
                flat
                type="submit"
                label="Criar conta"
                class="q-mb-md btn-outlined"
                :loading="loading"
                @click="createUser"
              />
              <q-btn
                type="submit"
                label="Entrar"
                class="q-mb-md btn-default"
                :loading="loading"
                @click="login"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import authServices from "src/services/auth.services";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      username: "",
      rules: [(val) => val.length > 0 || this.$t("common.rules.required")],
      emailRules: [
        (val, rules) => rules.email(val) || this.$t("common.rules.email"),
      ],
    };
  },
  methods: {
    createUser() {
      // TODO: implement create user
    },

    async login() {
      this.loading = true;

      try {
        const body = {
          username: this.username,
          email: this.email,
          password: this.password,
        };

        await authServices.login(body);

        this.$router.replace("/orders");
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  background-color: $secondary;

  &__title {
    color: $neutrals-80 !important;
    text-align: center;
  }
}
</style>

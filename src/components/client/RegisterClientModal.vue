<template>
  <q-dialog persistent v-model="openDialog" class="register-client">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-title>
        <div
          class="q-pa-md row justify-between items-center register-client__header"
        >
          <span class="register-client__header-label">
            {{
              $t("common.modal.create", { entity: $t("common.entity.client") })
            }}
          </span>

          <q-btn flat fab-mini icon="mdi-close" @click="closeModal" />
        </div>
      </q-card-title>
      <q-card-section class="scroll register-client__card-section">
        <q-form ref="form" greedy @validation-error="showErrorToast">
          <div class="row">
            <div class="column full-width q-my-md" cols="12">
              <span class="register-client__input-label">
                {{ $t("common.fields.name") }}:
              </span>
              <q-input v-model="name" dense outlined autogrow />
            </div>

            <div class="row justify-between col-12">
              <div class="column col-6 q-pr-md">
                <span class="register-client__input-label">
                  {{ $t("common.fields.email") }}:
                </span>
                <q-input v-model="email" outlined dense />
              </div>
            </div>

            <div class="column col-6">
              <span class="register-client__input-label">
                {{ $t("common.fields.phone") }}:
              </span>
              <q-input v-model="phone" dense outlined />
            </div>

            <div class="column col-6">
              <span class="register-client__input-label">
                {{ $t("common.fields.address") }}:
              </span>
              <q-input v-model="address" dense outlined />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-pa-md row justify-end register-client__actions">
        <q-btn flat class="btn-outlined" label="Cancelar" @click="closeModal" />
        <q-btn class="btn-default" label="Salvar" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import clientService from "src/services/client.service";

export default defineComponent({
  name: "RegisterClientModal",
  props: {
    value: Boolean,
  },
  data() {
    return {
      openDialog: false,
      loading: false,
      email: "",
      name: "",
      address: "",
      phone: "",
    };
  },
  watch: {
    value(isOpen) {
      this.openDialog = isOpen;
    },
  },
  methods: {
    showErrorToast() {
      this.$q.notify({
        color: "negative",
        position: "bottom",
        message: this.$t("common.notify.error.create", {
          entity: this.$t("common.singular.order"),
        }),
      });
    },

    async save() {
      if (this.$refs.form.validate()) {
        return this.$q.notify({
          type: "negative",
          position: "bottom",
          message: "Preencha todos os campos",
        });
      }

      try {
        const body = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          address: this.address,
        };

        await clientService.register(body);
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Erro ao registrar cliente",
        });
      }
    },

    closeModal() {
      this.openDialog = false;
      this.refreshData();
      this.$emit("close", false);
    },

    refreshData() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.address = "";
    },
  },
});
</script>

<style lang="scss">
.register-client {
  &__header {
    border-bottom: 1px solid $primary;
    background-color: #fef3d8;
  }

  &__header-label {
    font-size: 1.5rem;
    font-family: Fredoka One;
    color: $neutrals-100;
  }

  &__card-section {
    height: auto;
    max-height: 500px;
  }

  &__input-label {
    font-size: 0.75rem;
    color: $neutrals-100;
    font-weight: bold;
  }

  &__actions {
    border-top: 1px solid $primary;
    background-color: #fef3d8;
  }
}
</style>

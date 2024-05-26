<template>
  <q-dialog persistent v-model="openDialog" class="register-order">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-title>
        <div
          class="q-pa-md row justify-between items-center register-order__header"
        >
          <span class="register-order__header-label"> Registrar pedido </span>

          <q-btn flat fab-mini icon="mdi-close" @click="closeModal" />
        </div>
      </q-card-title>
      <q-card-section class="scroll register-order__card-section">
        <q-form ref="form" greedy @validation-error="showErrorToast">
          <div class="row">
            <div class="column col-8">
              <span class="register-order__input-label"> Cliente: </span>
              <q-select
                v-model="personId"
                use-input
                input-debounce="500"
                clearable
                options-dense
                outlined
                hide-bottom-space
                option-value="id"
                option-label="name"
                :loading="loading"
                :options="personOptions"
                @virtual-scroll="onScroll"
              />
            </div>

            <div class="column full-width q-my-md" cols="12">
              <span class="register-order__input-label">
                Descrição do pedido:
              </span>
              <q-input v-model="description" outlined autogrow />
            </div>

            <div class="row justify-between col-12">
              <div class="column col-6 q-pr-md">
                <span class="register-order__input-label"> Valor: </span>
                <q-input
                  v-model="price"
                  outlined
                  prefix="R$"
                  mask="#,##"
                  fill-mask="0"
                  reverse-fill-mask
                />
              </div>

              <div class="column col-6">
                <span class="register-order__input-label">
                  Data de entrega:
                </span>
                <q-input v-model="date" outlined type="date" />
              </div>
            </div>

            <div class="q-mt-md row col-12 justify-between">
              <div class="column col-6">
                <span class="register-order__input-label">
                  Utilizar endereço do cliente?
                </span>
                <q-toggle v-model="useClientAddress" />
              </div>

              <div class="column col-6">
                <span class="register-order__input-label">
                  Endereço de entrega:
                </span>
                <q-input v-model="address" outlined />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="q-pa-md row justify-end register-order__actions">
        <q-btn flat label="Cancelar" @click="openDialog = false" />
        <q-btn color="primary" label="Salvar" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import personService from "src/services/person.service";

export default defineComponent({
  name: "RegisterOrderModal",
  props: {
    value: Boolean,
  },
  data() {
    return {
      personId: null,
      openDialog: false,
      loading: false,
      useClientAddress: false,
      price: 0,
      description: "",
      address: "",
      date: "",
      personOptions: [],
    };
  },
  watch: {
    value(isOpen) {
      this.openDialog = isOpen;
      if (isOpen) {
        this.fetchPersons();
      }
    },
  },
  methods: {
    showErrorToast() {
      this.$q.notify({
        color: "negative",
        position: "bottom",
        message: "Erro ao salvar o pedido",
      });
    },

    onScroll({ to, ref }) {
      console.log("LOG: -> onScroll -> to, ref:", to, ref);
      setTimeout(() => {
        nextPage.value++;
        nextTick(() => {
          console.log("loading more options");
          loading.value = false;
        });
      }, 500);
    },

    async fetchPersons() {
      try {
        const response = await personService.getAll();

        this.personOptions = response;
      } catch (err) {
        console.error(err);
      }
    },
    async save() {
      if (this.$refs.form.validate()) {
        return this.$q.notify({
          color: "negative",
          position: "bottom",
          message: "Preencha todos os campos",
        });
      }

      try {
        const body = {
          personId: this.personId,
          price: this.price,
          description: this.description,
          address: this.address,
          date: this.date,
        };

        const response = await personService.register(body);
      } catch (err) {
        console.error(err);
      }
    },

    closeModal() {
      this.openDialog = false;
      this.refreshData();
      this.$emit("close", false);
    },

    refreshData() {
      this.personId = null;
      this.useClientAddress = false;
      this.price = 0;
      this.address = "";
      this.description = "";
      this.personOptions = [];
    },
  },
});
</script>

<style lang="scss">
.register-order {
  &__header {
    border-bottom: 1px solid $text--base;
  }

  &__header-label {
    font-size: 1.5rem;
    font-family: Fredoka One;
    color: $text;
  }

  &__card-section {
    height: auto;
    max-height: 500px;
  }

  &__input-label {
    font-size: 0.75rem;
    color: $text;
    font-weight: bold;
  }

  &__actions {
    border-top: 1px solid $text--base;
  }
}
</style>

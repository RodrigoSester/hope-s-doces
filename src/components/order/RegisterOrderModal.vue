<template>
  <q-dialog persistent v-model="openDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <q-form greedy @validation-error="showErrorToast">
          <div class="row">
            <div class="column col-8">
              <span> Cliente </span>
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

            <div class="column full-width q-mt-md" cols="12">
              <span> Descrição do pedido: </span>
              <q-input v-model="description" outlined autogrow />
            </div>

            <div class="column">
              <span> Valor </span>
              <q-input
                v-model="price"
                outlined
                prefix="R$"
                mask="#,##"
                fill-mask="0"
                reverse-fill-mask
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="row justify-end">
        <q-btn label="Cancelar" @click="openDialog = false" />
        <q-btn color="primary" label="Salvar" @click="openDialog = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

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
      price: 0,
      description: "",
      personOptions: [],
    };
  },
  watch: {
    value(isOpen) {
      this.openDialog = isOpen;
      console.log("abrindo modal");
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
  },
});
</script>

<style lang="scss"></style>

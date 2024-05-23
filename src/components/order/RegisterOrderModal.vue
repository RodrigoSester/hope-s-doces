<template>
  <q-dialog persistent v-model="openDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <q-form greedy @validation-error="showErrorToast">
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
          >
          </q-select>
        </q-form>
      </q-card-section>
      <q-card-actions>
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          @click="openDialog = false"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="openDialog = false"
        />
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

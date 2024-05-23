<template>
  <q-dialog persistent v-model="openDialog">
    <q-form greedy @validation-error="showErrorToast"> </q-form>
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
      openDialog: false,
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
        message: "Erro ao salvar o pedido",
      });
    },
  },
});
</script>

<style lang="scss"></style>

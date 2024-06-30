<template>
  <q-item
    :to="link"
    exact
    replace
    clickable
    class="row"
    active-class="essential-link__selected"
  >
    <q-item-section avatar class="q-pr-sm essential-link__icon">
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="essential-link__label">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.essential-link {
  &__icon {
    min-width: 32px;
    color: $neutrals-80;
  }

  &__label {
    color: $neutrals-80;
  }

  &__selected {
    background-color: $secondary;
    color: white;
  }
}
</style>

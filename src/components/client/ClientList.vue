<template>
  <q-page>
    <div class="row flex justify-between items-center q-pa-md client__header">
      <h1 class="q-my-sm client__header-title">
        {{ $t("common.plural.client") }}
      </h1>
      <div size="16px">
        <q-btn
          :label="
            $t('common.buttons.register', {
              entity: $t('common.singular.client'),
            })
          "
          icon="mdi-plus-thick"
          class="btn-default"
          size="16px"
          @click="clientModal = true"
        />
      </div>
    </div>
    <div class="row q-pa-md client__table">
      <q-table
        class="client__table-list"
        table-header-class="client__table-header"
        icon-first-page="mdi-page-first"
        icon-prev-page="mdi-chevron-left"
        icon-next-page="mdi-chevron-right"
        icon-last-page="mdi-page-last"
        separator="cell"
        row-key="id"
        :no-data-label="$t('common.table.noData')"
        :no-results-label="$t('common.table.noResults')"
        :rows-per-page-label="$t('common.table.rowsPerPage')"
        :rows-per-page-options="perPageOptions"
        :pagination-label="
          () =>
            $t('common.table.pagination', {
              page: pagination.page,
              pages: pagination.rowsNumber,
            })
        "
        v-model:pagination="pagination"
        :rows="rows"
        :columns="columns"
        :loading="loading"
      >
        <template #body-cell-person="props">
          <q-td :props="props">
            <div class="column">
              <span class="client__table-list-person">
                {{ props.row.person.name }}
              </span>
              <span class="client__table-list-person-number">
                {{ props.row.person.number }}
              </span>
            </div>
          </q-td>
        </template>
        <template #body-cell-actions="{ row }">
          <q-td>
            <ButtonGroup
              iconButton="mdi-dots-vertical"
              :item="row"
              :actions="actions"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { date } from "quasar";
import clientService from "src/services/client.service";
import ButtonGroup from "src/components/ui/ButtonGroup.vue";

const { formatDate } = date;

export default defineComponent({
  name: "ClientList",
  components: {
    ButtonGroup,
  },
  data() {
    return {
      loading: false,
      openRegisterOrderModal: false,
      rows: [],
      columns: [],
      actions: [],
      perPageOptions: [10, 25, 50],
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setColumns();
      this.setActions();
      this.fetchData();
    });
  },
  methods: {
    formatDate,
    setColumns() {
      this.columns = [
        {
          name: "id",
          label: "ID do cliente",
          align: "center",
          field: "id",
          sortable: true,
          headerClasses: "client__table-header__id",
        },
        {
          name: "name",
          label: "Nome",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          label: "E-mail",
          align: "left",
          field: "email",
          sortable: false,
        },
        {
          name: "number",
          label: "Número de contato",
          align: "left",
          field: "number",
          sortable: false,
        },
        {
          name: "totalOrders",
          label: "Total de pedidos",
          align: "left",
          field: "totalOrders",
          sortable: true,
        },
        {
          name: "adress",
          label: "Endereço",
          align: "left",
          field: "adress",
          sortable: false,
        },
        {
          name: "actions",
          label: "Ações",
          align: "center",
        },
      ];
    },
    setActions() {
      this.actions = [
        {
          label: "Editar",
          icon: "mdi-pencil-outline",
          callback: (item) => this.onEdit(item),
        },
        {
          label: "Excluir",
          icon: "mdi-cancel",
          callback: (item) => this.onDelete(item),
        },
      ];
    },
    async fetchData() {
      this.loading = true;

      try {
        const response = await clientService.getAll();

        this.rows = response;
      } catch (err) {
        // TODO: Add toast
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    onEdit(item) {
      // TODO: Implementar ação de edição
      console.log("LOG: -> onEdit -> item:", item);
    },
    onDelete(item) {
      // TODO: Implementar ação de cancelamento
      console.log("LOG: -> handleItemAction -> item:", item);
    },

    closeRegisterModal() {
      this.openRegisterOrderModal = false;
      this.fetchData();
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .client {
  &__header {
    width: 100%;
    height: 10%;
  }

  &__header-title {
    color: $neutrals-80;
    text-align: center;
    font-size: 60px;
  }

  &__table {
    width: 100%;
    height: 90%;
  }

  &__table-header {
    background-color: $primary;

    &__id {
      max-width: 100px;
      text-wrap: wrap;
    }

    th {
      font-size: 16px;
    }
  }

  &__table-list {
    width: 100%;
    height: 100%;
  }

  &__table-list-person {
    font-weight: bold;
    color: $neutrals-100;
    font-size: 16px;
  }

  &__table-list-person-number {
    color: $neutrals-80;
  }
}
</style>

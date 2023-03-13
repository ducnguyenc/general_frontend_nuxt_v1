<template>
  <b-container fluid>
    <b-row align-h="between" class="m-2">
      <b-col cols="3">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
        >
          <b-input-group>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-button to="/english/create" class="float-right"
          ><b-icon icon="plus-circle"></b-icon>
          Create
        </b-button>
      </b-col>
    </b-row>

    <b-table
      id="table-transition-example"
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      primary-key="age"
      :sort-by.sync="sortBy"
      :tbody-transition-props="transProps"
      :filter="filter"
      :filter-included-fields="filterOn"
      striped
      sort-icon-left
      hover
      responsive
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(image)="data">
        <b-link v-b-modal.modal-center @click="modal(data.value)">
          <b-img
            :src="data.value"
            fluid
            alt="Fluid image"
            style="width: 300px"
          ></b-img>
        </b-link>
      </template>
      <template #cell(action)="data">
        <b-button
          v-if="!isShowAction"
          :to="`/english/` + data.item.id + `/update`"
        >
          <b-icon icon="pencil"></b-icon>
        </b-button>
        <b-button v-if="!isShowAction" @click="deleteVocabulary(data.item.id)">
          <b-icon icon="trash"></b-icon>
        </b-button>
        <b-button v-if="isShowAction" @click="changeStatus(data)">
          <b-icon icon="eye"></b-icon>
        </b-button>
      </template>
    </b-table>
    <div class="overflow-auto float-right p-1">
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          pills
        ></b-pagination>
      </div>
    </div>
    <p>
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
    </p>

    <p>
      Selected Rows:<br />
      {{ selected }}
    </p>
    <b-modal id="modal-center" centered size="xl">
      <b-link :href="imageSrc">
        <b-img :src="imageSrc" fluid alt="Fluid image"></b-img>
      </b-link>
    </b-modal>
  </b-container>
</template>
  
<script>
export default {
  data() {
    return {
      transProps: {
        name: "flip-list",
      },
      sortBy: "age",
      fields: [
        { key: "index", sortable: true },
        { key: "name", sortable: true },
        { key: "address", sortable: true },
        { key: "price", sortable: true },
        { key: "note", sortable: true },
        {
          key: "image",
          sortable: true,
          thStyle: {
            width: "20%",
          },
        },
        { key: "action" },
      ],
      items: [
        {
          name: 40,
          address: "Dickerson",
          image:
            "https://drive.google.com/uc?export=view&id=10VIpnizNCn8aD8YbJ1cc3-w6GgOWI0vq",
          price: "Macdonald",
          note: "Macdonald",
        },
        {
          name: 1,
          address: "a",
          image:
            "https://drive.google.com/uc?export=view&id=10VIpnizNCn8aD8YbJ1cc3-w6GgOWI0vq",
          price: "v",
          note: "c",
        },
      ],
      selectMode: "multi",
      selected: [],
      rows: 100,
      perPage: 1,
      currentPage: 5,
      filter: null,
      filterOn: [],
      imageSrc: null,
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    modal(data) {
      this.imageSrc = data;
    },
  },
};
</script>

<template>
  <b-container fluid>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Day 1">
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4" to="/english/create"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="itemas1"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
              bordered
              striped
              hover
            >
              <template #head(action)="data">
                <b-form-checkbox
                  v-model="isShowAction"
                  name="check-button"
                  switch
                  @click="showAction()"
                >
                  <b>{{ data.label }}</b>
                </b-form-checkbox>
              </template>
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(english)="data">
                <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[1].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(spell)="data">
                <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
              </template>
              <template #cell(vietnamese)="data">
                <p v-if="[1, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[0].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(action)="data">
                <b-button
                  v-if="!isShowAction"
                  :to="`/english/` + data.item.id + `/update`"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button v-if="!isShowAction" @click="deleteVoca(data.item.id)">
                  <b-icon icon="trash"></b-icon>
                </b-button>
                <b-button v-if="isShowAction" @click="changeStatus(data)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
            <p>{{ selected }}</p>
          </b-card-text>
        </b-tab>

        <b-tab title="Day 2">
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="itemas2"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
              bordered
              striped
              hover
            >
              <template #head(action)="data">
                <b-form-checkbox
                  v-model="isShowAction"
                  name="check-button"
                  switch
                  @click="showAction()"
                >
                  <b>{{ data.label }}</b>
                </b-form-checkbox>
              </template>
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(english)="data">
                <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[1].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(vietnamese)="data">
                <p v-if="[1, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[0].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(action)="data">
                <b-button v-if="!isShowAction">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button v-if="!isShowAction">
                  <b-icon icon="trash"></b-icon>
                </b-button>
                <b-button v-if="isShowAction" @click="changeStatus(data)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
            <p>{{ selected }}</p>
          </b-card-text>
        </b-tab>

        <b-tab title="Day 3">
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>
          <b-card-text>
            <b-table
              :fields="fields"
              :items="itemas3"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
              bordered
              striped
              hover
            >
              <template #head(action)="data">
                <b-form-checkbox
                  v-model="isShowAction"
                  name="check-button"
                  switch
                  @click="showAction()"
                >
                  <b>{{ data.label }}</b>
                </b-form-checkbox>
              </template>
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(english)="data">
                <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[1].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(vietnamese)="data">
                <p v-if="[1, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[0].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(action)="data">
                <b-button v-if="!isShowAction">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button v-if="!isShowAction">
                  <b-icon icon="trash"></b-icon>
                </b-button>
                <b-button v-if="isShowAction" @click="changeStatus(data)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
            <p>{{ selected }}</p>
          </b-card-text>
        </b-tab>

        <b-tab title="Day 4">
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="itemas4"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
              bordered
              striped
              hover
            >
              <template #head(action)="data">
                <b-form-checkbox
                  v-model="isShowAction"
                  name="check-button"
                  switch
                  @click="showAction()"
                >
                  <b>{{ data.label }}</b>
                </b-form-checkbox>
              </template>
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(english)="data">
                <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[1].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(vietnamese)="data">
                <p v-if="[1, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[0].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(action)="data">
                <b-button v-if="!isShowAction">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button v-if="!isShowAction">
                  <b-icon icon="trash"></b-icon>
                </b-button>
                <b-button v-if="isShowAction" @click="changeStatus(data)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
            <p>{{ selected }}</p>
          </b-card-text>
        </b-tab>

        <b-tab title="Day 5">
          <b-button class="float-right mr-4 mb-4">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="itemas5"
              :select-mode="selectMode"
              selectable
              @row-selected="onRowSelected"
              bordered
              striped
              hover
            >
              <template #head(action)="data">
                <b-form-checkbox
                  v-model="isShowAction"
                  name="check-button"
                  switch
                  @click="showAction()"
                >
                  <b>{{ data.label }}</b>
                </b-form-checkbox>
              </template>
              <template #cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                  <span aria-hidden="true">&check;</span>
                  <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                  <span aria-hidden="true">&nbsp;</span>
                  <span class="sr-only">Not selected</span>
                </template>
              </template>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(english)="data">
                <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[1].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(vietnamese)="data">
                <p v-if="[1, 2].includes(data.item.status) || isShowTable">
                  {{ data.value }}
                </p>
                <input
                  v-if="[0].includes(data.item.status) && !isShowTable"
                  type="text"
                  @input="
                    (event) =>
                      (data.item.status =
                        event.target.value == data.value ? 2 : data.item.status)
                  "
                />
              </template>
              <template #cell(action)="data">
                <b-button v-if="!isShowAction">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button v-if="!isShowAction">
                  <b-icon icon="trash"></b-icon>
                </b-button>
                <b-button v-if="isShowAction" @click="changeStatus(data)">
                  <b-icon icon="eye"></b-icon>
                </b-button>
              </template>
            </b-table>
            <p>{{ selected }}</p>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "EnglishIndex",

  data() {
    return {
      statusTemp: [],
      isShowAction: false,
      isShowTable: false,
      selectMode: "multi",
      selected: [],
      fields: [
        { key: "selected" },
        { key: "index" },
        { key: "english" },
        { key: "spell" },
        { key: "vietnamese" },
        { key: "action" },
      ],
      itemas1: [],
      // itemas1: [
      //   {
      //     id: 2,
      //     english: 40,
      //     spell: "Dickerson",
      //     vietnam: "Macdonald",
      //     status: 0,
      //   },
      //   { id: 345, english: 21, spell: "Larsen", vietnam: "Shaw", status: 0 },
      //   { id: 23, english: 89, spell: "Geneva", vietnam: "Wilson", status: 1 },
      //   { id: 24, english: 38, spell: "Jami", vietnam: "Carney", status: 0 },
      // ],
      itemas2: [
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
      itemas3: [
        { english: 38, spell: "Jami", vietnam: "Carney" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
      itemas4: [{ english: 38, spell: "Jami", vietnam: "Carney" }],
      itemas5: [
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
    };
  },

  mounted() {
    this.fetchSomething();
  },

  methods: {
    async fetchSomething() {
      const response = await this.$axios.$get(
        "http://localhost:8000/api/english/vocabulary"
      );
      this.itemas1 = JSON.parse(response[1][0]);
    },

    async deleteVoca(id) {
      const response = await this.$axios.$delete(
        "http://localhost:8000/api/english/vocabulary/" + id
      );
    },

    onRowSelected(items) {
      this.selected = items;
    },
    showAction() {
      this.isShowAction = !this.isShowAction;
    },
    showFull() {
      this.isShowTable = !this.isShowTable;
    },
    changeStatus(data) {
      if (data.item.status != 2) {
        this.statusTemp[data.index] = data.item.status;
        data.item.status = 2;
      } else {
        data.item.status = this.statusTemp[data.index];
      }
    },
  },
};
</script>

<template>
  <b-container fluid>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Day 1">
          <b-button class="float-right mr-4 mb-4" @click="next()">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4" to="/english/create"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="dayFirst"
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
                <b-button
                  v-if="!isShowAction"
                  @click="deleteVocabulary(data.item.id)"
                >
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
          <b-button class="float-right mr-4 mb-4" @click="next()">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="previous()">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4" to="/english/create"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="daySecond"
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
                <b-button
                  v-if="!isShowAction"
                  @click="deleteVocabulary(data.item.id)"
                >
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
          <b-button class="float-right mr-4 mb-4" @click="next()">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="previous()">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4" to="/english/create"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="dayThird"
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
                <b-button
                  v-if="!isShowAction"
                  @click="deleteVocabulary(data.item.id)"
                >
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
          <b-button class="float-right mr-4 mb-4" @click="next()">
            <b-icon icon="chevron-right"></b-icon>
            Next
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="previous()">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4" to="/english/create"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="dayFourth"
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
                <b-button
                  v-if="!isShowAction"
                  @click="deleteVocabulary(data.item.id)"
                >
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
          <b-button class="float-right mr-4 mb-4" @click="previous()">
            <b-icon icon="chevron-left"></b-icon>
            Previous
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"
            ><b-icon icon="trash"></b-icon>
            Delete
          </b-button>
          <b-button class="float-right mr-4 mb-4" @click="showFull()"
            ><b-icon icon="eye"></b-icon>
            Show
          </b-button>
          <b-button class="float-right mr-4 mb-4" to="/english/create"
            ><b-icon icon="plus-circle"></b-icon>
            Create
          </b-button>

          <b-card-text>
            <b-table
              :fields="fields"
              :items="dayFiveth"
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
                <b-button
                  v-if="!isShowAction"
                  @click="deleteVocabulary(data.item.id)"
                >
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
      dayFirst: [],
      daySecond: [],
      dayThird: [],
      dayFourth: [],
      dayFiveth: [],
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
      this.dayFirst = JSON.parse(response[1][0]);
      this.daySecond = JSON.parse(response[2][1]);
      this.dayThird = JSON.parse(response[3][1]);
      this.dayFourth = JSON.parse(response[4][1]);
      this.dayFiveth = JSON.parse(response[5][1]);
    },

    async deleteVocabulary(id) {
      const response = await this.$axios.$delete(
        "http://localhost:8000/api/english/vocabulary/" + id
      );
    },

    async deleteAllVocabulary() {
      const response = await this.$axios.$post(
        "http://localhost:8000/api/english/vocabulary/delete"
      );
    },

    async next() {
      const response = await this.$axios.$post(
        "http://localhost:8000/api/english/vocabulary/forward",
        this.selected
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

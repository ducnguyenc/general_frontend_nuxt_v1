<template>
  <div>
    <b-button id="myBtn" size="sm" @click="topFunction()">
      <b-icon icon="arrow-up"></b-icon>
    </b-button>
    <b-container v-if="deviceType == 1" fluid>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Day 1">
            <b-button class="float-right mr-4 mb-4" @click="next()">
              <b-icon icon="chevron-right"></b-icon>
              Next
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="shuffle()">
              <div v-if="statusShuffle == true">
                <b-icon icon="shuffle"> </b-icon>
                Origin
              </div>
              <div v-if="statusShuffle == false">
                <b-icon icon="shuffle"> </b-icon>
                Shuffle
              </div>
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"><b-icon icon="trash"></b-icon>
              Delete
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="showFull()"><b-icon icon="eye"></b-icon>
              Show
            </b-button>
            <b-button class="float-right mr-4 mb-4" to="/english/create"><b-icon icon="plus-circle"></b-icon>
              Create
            </b-button>

            <b-card-text>
              <b-table :fields="fields" :items="dayFirst" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(part_of_speech)="data">
                  <p v-if="[0, 2].includes(data.item.status) || isShowTable">
                    {{ data.value }}
                  </p>
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
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
            <b-button class="float-right mr-4 mb-4" @click="shuffle()">
              <div v-if="statusShuffle == true">
                <b-icon icon="shuffle"> </b-icon>
                Origin
              </div>
              <div v-if="statusShuffle == false">
                <b-icon icon="shuffle"> </b-icon>
                Shuffle
              </div>
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"><b-icon icon="trash"></b-icon>
              Delete
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="showFull()"><b-icon icon="eye"></b-icon>
              Show
            </b-button>
            <b-button class="float-right mr-4 mb-4" to="/english/create"><b-icon icon="plus-circle"></b-icon>
              Create
            </b-button>

            <b-card-text>
              <b-table :fields="fields" :items="daySecond" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
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
            <b-button class="float-right mr-4 mb-4" @click="shuffle()">
              <div v-if="statusShuffle == true">
                <b-icon icon="shuffle"> </b-icon>
                Origin
              </div>
              <div v-if="statusShuffle == false">
                <b-icon icon="shuffle"> </b-icon>
                Shuffle
              </div>
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"><b-icon icon="trash"></b-icon>
              Delete
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="showFull()"><b-icon icon="eye"></b-icon>
              Show
            </b-button>
            <b-button class="float-right mr-4 mb-4" to="/english/create"><b-icon icon="plus-circle"></b-icon>
              Create
            </b-button>

            <b-card-text>
              <b-table :fields="fields" :items="dayThird" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
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
            <b-button class="float-right mr-4 mb-4" @click="shuffle()">
              <div v-if="statusShuffle == true">
                <b-icon icon="shuffle"> </b-icon>
                Origin
              </div>
              <div v-if="statusShuffle == false">
                <b-icon icon="shuffle"> </b-icon>
                Shuffle
              </div>
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"><b-icon icon="trash"></b-icon>
              Delete
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="showFull()"><b-icon icon="eye"></b-icon>
              Show
            </b-button>
            <b-button class="float-right mr-4 mb-4" to="/english/create"><b-icon icon="plus-circle"></b-icon>
              Create
            </b-button>

            <b-card-text>
              <b-table :fields="fields" :items="dayFourth" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
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
              <p>{{ selected }}</p>
            </b-card-text>
          </b-tab>

          <b-tab title="Day 5">
            <b-button class="float-right mr-4 mb-4" @click="previous()">
              <b-icon icon="chevron-left"></b-icon>
              Previous
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="shuffle()">
              <div v-if="statusShuffle == true">
                <b-icon icon="shuffle"> </b-icon>
                Origin
              </div>
              <div v-if="statusShuffle == false">
                <b-icon icon="shuffle"> </b-icon>
                Shuffle
              </div>
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="deleteAllVocabulary()"><b-icon icon="trash"></b-icon>
              Delete
            </b-button>
            <b-button class="float-right mr-4 mb-4" @click="showFull()"><b-icon icon="eye"></b-icon>
              Show
            </b-button>
            <b-button class="float-right mr-4 mb-4" to="/english/create"><b-icon icon="plus-circle"></b-icon>
              Create
            </b-button>

            <b-card-text>
              <b-table :fields="fields" :items="dayFiveth" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
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
              <p>{{ selected }}</p>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
    <b-container v-if="deviceType == 2" fluid>
      <b-card no-body>
        <b-tabs small card class="b-tab-mobile">
          <b-tab title="Day 1">
            <div class="button-mobile">
              <b-button size="sm" class="float-right mr-2 mb-2" @click="next()">
                <b-icon icon="chevron-right"></b-icon>
                Next1
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="shuffle()">
                <div v-if="statusShuffle == true">
                  <b-icon icon="shuffle"> </b-icon>
                  Origin
                </div>
                <div v-if="statusShuffle == false">
                  <b-icon icon="shuffle"> </b-icon>
                  Shuffle
                </div>
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="deleteAllVocabulary()"><b-icon
                  icon="trash"></b-icon>
                Delete
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="showFull()"><b-icon icon="eye"></b-icon>
                Show
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" to="/english/create"><b-icon icon="plus-circle"></b-icon>
                Create
              </b-button>
            </div>

            <b-card-text>
              <b-table :fields="fields" :items="dayFirst" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover small stacked>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="!isShowAction" @click="deleteVocabulary(data.item.id)">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="isShowAction" @click="changeStatus(data)">
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                </template>
              </b-table>
              <p>{{ selected }}</p>
            </b-card-text>
          </b-tab>

          <b-tab title="Day 2">
            <div class="button-mobile">
              <b-button size="sm" class="float-right mr-2 mb-2" @click="next()">
                <b-icon icon="chevron-right"></b-icon>
                Next
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="previous()">
                <b-icon icon="chevron-left"></b-icon>
                Previous
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="shuffle()">
                <div v-if="statusShuffle == true">
                  <b-icon icon="shuffle"> </b-icon>
                  Origin
                </div>
                <div v-if="statusShuffle == false">
                  <b-icon icon="shuffle"> </b-icon>
                  Shuffle
                </div>
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="deleteAllVocabulary()"><b-icon
                  icon="trash"></b-icon>
                Delete
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="showFull()"><b-icon icon="eye"></b-icon>
                Show
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" to="/english/create"><b-icon icon="plus-circle"></b-icon>
                Create
              </b-button>
            </div>

            <b-card-text>
              <b-table :fields="fields" :items="daySecond" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover small stacked>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="!isShowAction" @click="deleteVocabulary(data.item.id)">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="isShowAction" @click="changeStatus(data)">
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                </template>
              </b-table>
              <p>{{ selected }}</p>
            </b-card-text>
          </b-tab>

          <b-tab title="Day 3">
            <div class="button-mobile">
              <b-button size="sm" class="float-right mr-2 mb-2" @click="next()">
                <b-icon icon="chevron-right"></b-icon>
                Next
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="previous()">
                <b-icon icon="chevron-left"></b-icon>
                Previous
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="shuffle()">
                <div v-if="statusShuffle == true">
                  <b-icon icon="shuffle"> </b-icon>
                  Origin
                </div>
                <div v-if="statusShuffle == false">
                  <b-icon icon="shuffle"> </b-icon>
                  Shuffle
                </div>
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="deleteAllVocabulary()"><b-icon
                  icon="trash"></b-icon>
                Delete
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="showFull()"><b-icon icon="eye"></b-icon>
                Show
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" to="/english/create"><b-icon icon="plus-circle"></b-icon>
                Create
              </b-button>
            </div>

            <b-card-text>
              <b-table :fields="fields" :items="dayThird" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover small stacked>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="!isShowAction" @click="deleteVocabulary(data.item.id)">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="isShowAction" @click="changeStatus(data)">
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                </template>
              </b-table>
              <p>{{ selected }}</p>
            </b-card-text>
          </b-tab>

          <b-tab title="Day 4">
            <div class="button-mobile">
              <b-button size="sm" class="float-right mr-2 mb-2" @click="next()">
                <b-icon icon="chevron-right"></b-icon>
                Next
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="previous()">
                <b-icon icon="chevron-left"></b-icon>
                Previous
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="shuffle()">
                <div v-if="statusShuffle == true">
                  <b-icon icon="shuffle"> </b-icon>
                  Origin
                </div>
                <div v-if="statusShuffle == false">
                  <b-icon icon="shuffle"> </b-icon>
                  Shuffle
                </div>
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="deleteAllVocabulary()"><b-icon
                  icon="trash"></b-icon>
                Delete
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="showFull()"><b-icon icon="eye"></b-icon>
                Show
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" to="/english/create"><b-icon icon="plus-circle"></b-icon>
                Create
              </b-button>
            </div>

            <b-card-text>
              <b-table :fields="fields" :items="dayFourth" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover small stacked>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="!isShowAction" @click="deleteVocabulary(data.item.id)">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="isShowAction" @click="changeStatus(data)">
                    <b-icon icon="eye"></b-icon>
                  </b-button>
                </template>
              </b-table>
              <p>{{ selected }}</p>
            </b-card-text>
          </b-tab>

          <b-tab title="Day 5">
            <div class="button-mobile">
              <b-button size="sm" class="float-right mr-2 mb-2" @click="previous()">
                <b-icon icon="chevron-left"></b-icon>
                Previous
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="shuffle()">
                <div v-if="statusShuffle == true">
                  <b-icon icon="shuffle"> </b-icon>
                  Origin
                </div>
                <div v-if="statusShuffle == false">
                  <b-icon icon="shuffle"> </b-icon>
                  Shuffle
                </div>
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="deleteAllVocabulary()"><b-icon
                  icon="trash"></b-icon>
                Delete
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" @click="showFull()"><b-icon icon="eye"></b-icon>
                Show
              </b-button>
              <b-button size="sm" class="float-right mr-2 mb-2" to="/english/create"><b-icon icon="plus-circle"></b-icon>
                Create
              </b-button>
            </div>

            <b-card-text>
              <b-table :fields="fields" :items="dayFiveth" :select-mode="selectMode" selectable
                @row-selected="onRowSelected" bordered striped hover small stacked>
                <template #head(action)="data">
                  <b-form-checkbox v-model="isShowAction" name="check-button" switch @click="showAction()">
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
                  <input v-if="[1].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
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
                  <input v-if="[0].includes(data.item.status) && !isShowTable" type="text" @input="(event) =>
                  (data.item.status =
                    data.value.split(',').includes(event.target.value) ? 2 : data.item.status)
                    " />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" v-if="!isShowAction" :to="`/english/` + data.item.id + `/update`">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="!isShowAction" @click="deleteVocabulary(data.item.id)">
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                  <b-button size="sm" v-if="isShowAction" @click="changeStatus(data)">
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
  </div>
</template>

<script>
export default {
  name: "EnglishIndex",

  data() {
    return {
      statusTemp: [],
      statusShuffle: true,
      isShowAction: false,
      isShowTable: false,
      selectMode: "multi",
      selected: [],
      fields: [
        { key: "selected" },
        { key: "index" },
        { key: "english" },
        { key: "part_of_speech" },
        { key: "spell" },
        { key: "vietnamese" },
        { key: "example" },
        { key: "action" },
      ],
      dayFirst: [],
      daySecond: [],
      dayThird: [],
      dayFourth: [],
      dayFiveth: [],
      deviceType: 1,
    };
  },

  mounted() {
    this.fetchVocabulary();
    this.checkDevice();
  },

  methods: {
    async fetchVocabulary() {
      const response = await this.$axios.$get(
        "https://laravel-general.000webhostapp.com/api/english/vocabulary",
        {
          params: {
            status_shuffle: this.statusShuffle,
          },
        }
      );
      this.dayFirst = response[1];
      this.daySecond = response[2];
      this.dayThird = response[3];
      this.dayFourth = response[4];
      this.dayFiveth = response[5];
      this.setStatusTemp(this.dayFirst);
      this.setStatusTemp(this.daySecond);
      this.setStatusTemp(this.dayThird);
      this.setStatusTemp(this.dayFourth);
      this.setStatusTemp(this.dayFiveth);
    },

    async deleteVocabulary(id) {
      // const response = await this.$axios.$delete(
      //   "https://laravel-general.000webhostapp.com/api/english/vocabulary/" + id
      // );

      const response = await fetch("https://laravel-general.000webhostapp.com/api/english/vocabulary/destroy/" + id, {
        method: "GET",
      })

      if (response) {
        this.fetchVocabulary();
      }
    },

    async deleteAllVocabulary() {
      // const response = await this.$axios.$post(
      //   "https://laravel-general.000webhostapp.com/api/english/vocabulary/delete",
      //   this.selected
      // );

      const response = await fetch("https://laravel-general.000webhostapp.com/api/english/vocabulary/delete", {
        method: "POST",
        body: JSON.stringify(this.selected),
      })

      if (response) {
        this.fetchVocabulary();
      }
    },

    async next() {
      // const response = await this.$axios.$post(
      //   "https://laravel-general.000webhostapp.com/api/english/vocabulary/forward",
      //   this.selected
      // );

      const response = await fetch("https://laravel-general.000webhostapp.com/api/english/vocabulary/forward", {
        method: "POST",
        body: JSON.stringify(this.selected),
      })

      if (response) {
        this.fetchVocabulary();
      }
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
        this.statusTemp[data.item.id] = data.item.status;
        data.item.status = 2;
      } else {
        data.item.status = this.statusTemp[data.item.id];
      }
    },
    shuffle() {
      this.statusShuffle = this.statusShuffle ? 0 : 1;
      this.fetchVocabulary();
    },
    reset() {
      this.input.first = "";
      this.input.second = "";
      this.input.third = "";
      this.input.fourth = "";
      this.input.fiveth = "";
    },
    setStatusTemp(data) {
      data.forEach((element) => {
        this.statusTemp[element.id] = element.status;
      });
    },
    checkDevice() {
      const isMobile =
        /(Android|webOS|iPhone|iPad|iPod|tablet|BlackBerry|Mobile|Windows Phone)/i.test(
          navigator.userAgent
        );
      if (isMobile) {
        this.deviceType = 2;
      } else {
        this.deviceType = 1;
      }
    },
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>

<style>
.b-tab-mobile .nav-link {
  padding: 4px 12px;
}

.b-tab-mobile .button-mobile {
  display: flex;
  flex-wrap: wrap;
}

.b-tab-mobile .button-mobile .btn {
  width: 88px;
  padding: 0.25rem 0rem
}

.b-tab-mobile .b-table {
  font-size: 12px
}

.b-tab-mobile .table.b-table.b-table-stacked>tbody>tr>[data-label]::before {
  width: 30%;
  text-align: left
}

#myBtn {
  position: fixed;
  z-index: 99;
  right: 10px;
  bottom: 80px;
}
</style>
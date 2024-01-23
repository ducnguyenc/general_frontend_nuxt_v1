<template>
  <div>
    <b-container v-if="deviceType == 1" fluid>
      <b-card no-body>
        <b-tabs small card>
          <b-tab title="Day 1">
            <b-form @submit="onsubmit($event, dayFirst, 1)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[1] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label v-if="status[1]" :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordHide[1] + ', ' + wordShow[1]
                }}</label>
                <b-form-input class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[1]"></b-form-input>
                <b-button size="xs" type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select v-model="selected[1]" :options="selects" value="null"
                  @change="genVocabulary(dayFirst, 1)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[1] == true">
                  <b-td>{{ vocabulary[1].english }}</b-td>
                  <b-td> {{ vocabulary[1].spell }} </b-td>
                  <b-td> {{ vocabulary[1].vietnamese }} </b-td>
                  <b-td> {{ vocabulary[1].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 2">
            <b-form @submit="onsubmit($event, daySecond, 2)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[2] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[2]
                }}</label>
                <b-form-input class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[2]"></b-form-input>
                <b-button type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select v-model="selected[2]" :options="selects" value="null"
                  @change="genVocabulary(daySecond, 2)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[2] == true">
                  <b-td>{{ vocabulary[2].english }}</b-td>
                  <b-td> {{ vocabulary[2].spell }} </b-td>
                  <b-td> {{ vocabulary[2].vietnamese }} </b-td>
                  <b-td> {{ vocabulary[2].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 3">
            <b-form @submit="onsubmit($event, dayThird, 3)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[3] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[3]
                }}</label>
                <b-form-input class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[3]"></b-form-input>
                <b-button type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select v-model="selected[3]" :options="selects" value="null"
                  @change="genVocabulary(dayThird, 3)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[3] == true">
                  <b-td>{{ vocabulary[3].english }}</b-td>
                  <b-td> {{ vocabulary[3].spell }} </b-td>
                  <b-td> {{ vocabulary[3].vietnamese }} </b-td>
                  <b-td> {{ vocabulary[3].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 4">
            <b-form @submit="onsubmit($event, dayFourth, 4)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[4] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[4]
                }}</label>
                <b-form-input class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[4]"></b-form-input>
                <b-button type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select v-model="selected[4]" :options="selects" value="null"
                  @change="genVocabulary(dayFourth, 4)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[4] == true">
                  <b-td>{{ vocabulary[4].english }}</b-td>
                  <b-td> {{ vocabulary[4].spell }} </b-td>
                  <b-td> {{ vocabulary[4].vietnamese }} </b-td>
                  <b-td> {{ vocabulary[4].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 5">
            <b-form @submit="onsubmit($event, dayFiveth, 5)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[5] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[5]
                }}</label>
                <b-form-input class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[5]"></b-form-input>
                <b-button type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select v-model="selected[5]" :options="selects" value="null"
                  @change="genVocabulary(dayFiveth, 5)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[5] == true">
                  <b-td>{{ vocabulary[5].english }}</b-td>
                  <b-td> {{ vocabulary[5].spell }} </b-td>
                  <b-td> {{ vocabulary[5].vietnamese }} </b-td>
                  <b-td> {{ vocabulary[5].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
    <b-container v-if="deviceType == 2" fluid>
      <b-card no-body>
        <b-tabs small card class="b-tab-training-mobile">
          <b-tab title="Day 1">
            <b-form @submit="onsubmit($event, dayFirst, 1)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[1] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[1]
                }}</label>
                <b-form-input size="xs" class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[1]"></b-form-input>
                <b-button size="xs" type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select size="xs" v-model="selected[1]" :options="selects" value="null"
                  @change="genVocabulary(dayFirst, 1)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive stacked>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell US</b-th>
                  <b-th>Spell Uk</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[1] == true">
                  <b-td stacked-heading="English">{{ vocabulary[1].english }}</b-td>
                  <b-td stacked-heading="Spell US"> {{ vocabulary[1].spell.us }} </b-td>
                  <b-td stacked-heading="Spell UK"> {{ vocabulary[1].spell.uk }} </b-td>
                  <b-td stacked-heading="Vietnamese"> {{ vocabulary[1].vietnamese }} </b-td>
                  <b-td stacked-heading="Example"> {{ vocabulary[1].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 2">
            <b-form @submit="onsubmit($event, daySecond, 2)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[2] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[2]
                }}</label>
                <b-form-input size="xs" class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[2]"></b-form-input>
                <b-button size="xs" type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select size="xs" v-model="selected[2]" :options="selects" value="null"
                  @change="genVocabulary(daySecond, 2)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive stacked>
              <b-thead head-variant="light">
                <b-tr>
                  <b-tr>
                    <b-th>English</b-th>
                    <b-th>Spell US</b-th>
                    <b-th>Spell Uk</b-th>
                    <b-th>Vietnamese</b-th>
                    <b-th>Example</b-th>
                  </b-tr>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[2] == true">
                  <b-td stacked-heading="English">{{ vocabulary[2].english }}</b-td>
                  <b-td stacked-heading="Spell US"> {{ vocabulary[2].spell.us }} </b-td>
                  <b-td stacked-heading="Spell UK"> {{ vocabulary[2].spell.uk }} </b-td>
                  <b-td stacked-heading="Vietnamese"> {{ vocabulary[2].vietnamese }} </b-td>
                  <b-td stacked-heading="Example"> {{ vocabulary[2].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 3">
            <b-form @submit="onsubmit($event, dayThird, 3)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[3] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[3]
                }}</label>
                <b-form-input size="xs" class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[3]"></b-form-input>
                <b-button size="xs" type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select size="xs" v-model="selected[3]" :options="selects" value="null"
                  @change="genVocabulary(dayThird, 3)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive stacked>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell US</b-th>
                  <b-th>Spell Uk</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[3] == true">
                  <b-td stacked-heading="English">{{ vocabulary[3].english }}</b-td>
                  <b-td stacked-heading="Spell US"> {{ vocabulary[3].spell.us }} </b-td>
                  <b-td stacked-heading="Spell UK"> {{ vocabulary[3].spell.uk }} </b-td>
                  <b-td stacked-heading="Vietnamese"> {{ vocabulary[3].vietnamese }} </b-td>
                  <b-td stacked-heading="Example"> {{ vocabulary[3].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 4">
            <b-form @submit="onsubmit($event, dayFourth, 4)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[4] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[4]
                }}</label>
                <b-form-input size="xs" class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[4]"></b-form-input>
                <b-button size="xs" type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select size="xs" v-model="selected[4]" :options="selects" value="null"
                  @change="genVocabulary(dayFourth, 4)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive stacked>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell US</b-th>
                  <b-th>Spell Uk</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[4] == true">
                  <b-td stacked-heading="English">{{ vocabulary[4].english }}</b-td>
                  <b-td stacked-heading="Spell US"> {{ vocabulary[4].spell.us }} </b-td>
                  <b-td stacked-heading="Spell UK"> {{ vocabulary[4].spell.uk }} </b-td>
                  <b-td stacked-heading="Vietnamese"> {{ vocabulary[4].vietnamese }} </b-td>
                  <b-td stacked-heading="Example"> {{ vocabulary[4].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
          <b-tab title="Day 5">
            <b-form @submit="onsubmit($event, dayFiveth, 5)" inline class="mb-2 justify-content-around">
              <div>
                <span class="font-weight-bold">remaining words {{ vocabularyLength[5] }}</span>
              </div>
              <div class="d-flex">
                <span hidden>{{ test }}</span>
                <label :class="`mr-sm-2 font-weight-bold ` + color">{{
                  wordShow[5]
                }}</label>
                <b-form-input size="xs" class="mb-2 mr-sm-2 mb-sm-0" autofocus v-model="text[5]"></b-form-input>
                <b-button size="xs" type="submit" variant="primary">Submit</b-button>
              </div>
              <div>
                <b-form-select size="xs" v-model="selected[5]" :options="selects" value="null"
                  @change="genVocabulary(dayFiveth, 5)"></b-form-select>
              </div>
            </b-form>

            <b-table-simple hover responsive stacked>
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>English</b-th>
                  <b-th>Spell US</b-th>
                  <b-th>Spell Uk</b-th>
                  <b-th>Vietnamese</b-th>
                  <b-th>Example</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-if="status[5] == true">
                  <b-td stacked-heading="English">{{ vocabulary[5].english }}</b-td>
                  <b-td stacked-heading="Spell US"> {{ vocabulary[5].spell.us }} </b-td>
                  <b-td stacked-heading="Spell UK"> {{ vocabulary[5].spell.uk }} </b-td>
                  <b-td stacked-heading="Vietnamese"> {{ vocabulary[5].vietnamese }} </b-td>
                  <b-td stacked-heading="Example"> {{ vocabulary[5].example }} </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "EnglishTrainingIndex",

  data() {
    return {
      status: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
      statusWord: {},
      text: {},
      wordShow: {},
      wordHide: {},
      vocabulary: {},
      statusShuffle: true,
      fields: ["english", "spell", "vietnamese"],
      dayFirst: [],
      daySecond: [],
      dayThird: [],
      dayFourth: [],
      dayFiveth: [],
      test: 1,
      color: "",
      selected: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
      },
      selects: [
        { value: null, text: "Shuffer" },
        { value: 0, text: "English" },
        { value: 1, text: "Vietnamese" },
      ],
      vocabularyLength: {},
      deviceType: 1,
      isSound: false,
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
      this.test = 2;
      this.vocabularyLength[1] = this.dayFirst.length;
      this.vocabularyLength[2] = this.daySecond.length;
      this.vocabularyLength[3] = this.dayThird.length;
      this.vocabularyLength[4] = this.dayFourth.length;
      this.vocabularyLength[5] = this.dayFiveth.length;
    },
    genVocabulary(vocabularyDay, day) {
      if (vocabularyDay.length == 0) {
        this.wordShow[day] = "hết mất tiêu";
      } else {
        this.statusWord[day] = 1
        // this.selected[day] ?? Math.floor(Math.random() * 2);
        if (this.statusWord[day] == 0) {
          this.test = 3;
          this.wordShow[day] = vocabularyDay[0]["english"];
          this.wordHide[day] = vocabularyDay[0]["vietnamese"];
        } else {
          this.test = 4;
          this.wordShow[day] = vocabularyDay[0]["vietnamese"];
          this.wordHide[day] = vocabularyDay[0]["english"];
        }
        this.vocabulary[day] = vocabularyDay[0];
        this.test = 5;
        if (day == 1) {
          let wordAudio = this.statusWord[day] ? this.wordHide[day] : this.wordShow[day]
          new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=' + wordAudio).play();
        }
      }
    },
    onsubmit(event, vocabularyDay, day) {
      event.preventDefault();
      if (!this.isSound) {
        this.genVocabulary(this.dayFirst, 1);
        this.genVocabulary(this.daySecond, 2);
        this.genVocabulary(this.dayThird, 3);
        this.genVocabulary(this.dayFourth, 4);
        this.genVocabulary(this.dayFiveth, 5);
        this.isSound = !this.isSound
        return
      }
      if (this.status[day]) {
        if (this.wordHide[day].includes(this.text[day])) {
          vocabularyDay.shift();
          this.vocabularyLength[day] = vocabularyDay.length;
        } else {
          const temp = vocabularyDay[0];
          vocabularyDay.shift();
          vocabularyDay.push(temp);
        }
        this.color = "text-dark";
        this.text[day] = null;
        this.genVocabulary(vocabularyDay, day);
      } else {
        if (this.wordHide[day].includes(this.text[day])) {
          this.color = "text-success";
        } else {
          this.color = "text-danger";
        }
      }
      this.status[day] = !this.status[day];
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
  },
};
</script>

<style>
.b-tab-training-mobile .nav-link {
  padding: 4px 12px;
}

.b-tab-training-mobile {
  font-size: 12px;
}

.b-tab-training-mobile .btn {
  font-size: 12px;
}

.b-tab-training-mobile .d-flex {
  flex-wrap: wrap;
}

.b-tab-training-mobile .table.b-table.b-table-stacked>tbody>tr>[data-label]::before {
  width: 30%;
}
</style>

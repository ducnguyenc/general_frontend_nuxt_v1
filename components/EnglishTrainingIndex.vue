<template>
  <b-container fluid>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Day 1">
          <b-form
            @submit="onsubmit($event, dayFirst, 1)"
            inline
            class="mb-2 justify-content-center"
          >
            <span hidden>{{ test }}</span>
            <label class="mr-sm-2">{{ wordShow[1] }}</label>
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0"
              autofocus
              v-model="text[1]"
            ></b-form-input>
            <b-button type="submit" variant="primary">Submit</b-button>
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
        <b-tab title="Day 2"> </b-tab>
        <b-tab title="Day 3"> </b-tab>
        <b-tab title="Day 4"> </b-tab>
        <b-tab title="Day 5"> </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
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
    };
  },

  mounted() {
    this.fetchVocabulary();
  },

  methods: {
    async fetchVocabulary() {
      const response = await this.$axios.$get(
        "http://localhost:8000/api/english/vocabulary",
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
      this.genVocabulary(this.dayFirst, 1);
      this.genVocabulary(this.daySecond, 2);
      this.genVocabulary(this.dayThird, 3);
      this.genVocabulary(this.dayFourth, 4);
      this.genVocabulary(this.dayFiveth, 5);
    },
    genVocabulary(vocabularyDay, day) {
      if (vocabularyDay.length == 0) {
        this.wordShow[day] = "het me roi";
      } else {
        this.statusWord[day] = Math.floor(Math.random() * 2);
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
      }
    },
    onsubmit(event, vocabularyDay, day) {
      event.preventDefault();
      if (this.status[day]) {
        if (this.text[day] == this.wordHide[day]) {
          vocabularyDay.shift();
        } else {
          const temp = vocabularyDay[0];
          vocabularyDay.shift();
          vocabularyDay.push(temp);
        }
        this.text[day] = null;
        this.genVocabulary(vocabularyDay, day);
      }
      this.status[day] = !this.status[day];
    },
  },
};
</script>

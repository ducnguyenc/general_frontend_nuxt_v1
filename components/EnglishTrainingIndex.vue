<template>
  <b-container fluid>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Day 1">
          <b-form @submit="onsubmit" class="text-center">
            <div>{{ vocabulary }}</div>
            <div class="d-flex justify-content-center">
              <b-form-input autofocus class="w-25" v-model="text" placeholder="Enter your name"></b-form-input>
            </div>
            <div v-if="status" class="mb-3">
              {{ vocabularyOk.english }}
              {{ vocabularyOk.spell }}
              {{ vocabularyOk.vietnamese }}
            </div>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-tab>
        <b-tab title="Day 2">
        </b-tab>
        <b-tab title="Day 3">
        </b-tab>
        <b-tab title="Day 4">
        </b-tab>
        <b-tab title="Day 5">
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "EnglishTrainingIndex",

  data() {
    return {
      status: false,
      text: '',
      vocabulary: '',
      vocabularyOk: '',
      vocabularyOkchua: '',
      statusShuffle: true,
      fields: ['english', 'spell', 'vietnamese'],
      dayFirst: [],
      daySecond: [],
      dayThird: [],
      dayFourth: [],
      dayFiveth: [],
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
      this.genVocabulary()
    },
    genVocabulary() {
      if (this.dayFirst.length == 0) {
        this.vocabulary = 'het me roi'
      } else {
        if (this.dayFirst[0]['status'] == 0) {
          this.vocabulary = this.dayFirst[0]['english']
          this.vocabularyOkchua = this.dayFirst[0]['vietnamese']
        } else {
          this.vocabulary = this.dayFirst[0]['vietnamese']
          this.vocabularyOkchua = this.dayFirst[0]['english']
        }
        this.vocabularyOk = this.dayFirst[0]
      }
    },
    onsubmit(event) {
      event.preventDefault()
      if (!this.status && this.text == this.vocabularyOkchua) {
        this.status = true
        this.dayFirst.shift()
      } else {
        this.status = false
        const temp = this.dayFirst[0]
        this.dayFirst.shift()
        this.dayFirst.push(temp)
        this.text = ''
        this.genVocabulary()
      }
    }
  },
};
</script>

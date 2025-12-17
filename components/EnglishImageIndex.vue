<template>
  <div>
    <b-container fluid>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Day 1">
            <b-card-header>
              <h5>English Image Training - Day 1</h5>
            </b-card-header>
            <b-card-body>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>Score: {{ correctAnswersDay1 }}/{{ dayFirst.length }}</strong>
                </div>
                <div>
                  <b-button @click="resetGame(1)" variant="secondary" size="sm" class="mr-2">
                    Reset
                  </b-button>
                  <b-button @click="showAllAnswers(1)" variant="info" size="sm">
                    Show All Answers
                  </b-button>
                </div>
              </div>
              <b-table :fields="fields" :items="dayFirst" bordered striped hover responsive>
                <template #cell(no)="data">
                  <span class="font-weight-bold">{{ data.index + 1 }}</span>
                </template>

                <template #cell(image)="data">
                  <div v-if="data.value" class="text-center">
                    <img :src="data.value" alt="Vocabulary Image"
                      style="max-width: 150px; max-height: 150px; cursor: pointer;"
                      @click="playAudio(data.item.english)" class="img-thumbnail" />
                  </div>
                  <span v-else class="text-muted">No image</span>
                </template>

                <template #cell(english)="data">
                  <b-form-input v-model="userInputs[data.index]" :class="{
                    'is-valid': isCorrect[data.index] === true,
                    'is-invalid': isCorrect[data.index] === false
                  }" @keyup.enter="checkAnswer(data.index, data.item.english)" placeholder="Enter English word..."
                    size="sm" />
                </template>

                <template #cell(part_of_speech)="data">
                  <div v-if="showAnswer[data.index]" :class="{
                    'text-success': isCorrect[data.index],
                    'text-muted': !isCorrect[data.index]
                  }" class="font-weight-bold">
                    {{ data.item.part_of_speech }}
                  </div>
                  <div v-else class="text-muted">
                    ---
                  </div>
                </template>
              </b-table>


            </b-card-body>
          </b-tab>

          <b-tab title="Day 2">
            <b-card-header>
              <h5>English Image Training - Day 2</h5>
            </b-card-header>
            <b-card-body>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>Score: {{ correctAnswersDay2 }}/{{ daySecond.length }}</strong>
                </div>
                <div>
                  <b-button @click="resetGame(2)" variant="secondary" size="sm" class="mr-2">
                    Reset
                  </b-button>
                  <b-button @click="showAllAnswers(2)" variant="info" size="sm">
                    Show All Answers
                  </b-button>
                </div>
              </div>
              <b-table :fields="fields" :items="daySecond" bordered striped hover responsive>
                <template #cell(image)="data">
                  <div v-if="data.value" class="text-center">
                    <img :src="data.value" alt="Vocabulary Image"
                      style="max-width: 150px; max-height: 150px; cursor: pointer;"
                      @click="playAudio(data.item.english)" class="img-thumbnail" />
                  </div>
                  <span v-else class="text-muted">No image</span>
                </template>

                <template #cell(no)="data">
                  <span class="font-weight-bold">{{ data.index + 1 }}</span>
                </template>

                <template #cell(english)="data">
                  <b-form-input v-model="userInputs[data.index]" :class="{
                    'is-valid': isCorrect[data.index] === true,
                    'is-invalid': isCorrect[data.index] === false
                  }" @keyup.enter="checkAnswer(data.index, data.item.english)" placeholder="Enter English word..."
                    size="sm" />
                </template>

                <template #cell(part_of_speech)="data">
                  <div v-if="showAnswer[data.index]" :class="{
                    'text-success': isCorrect[data.index],
                    'text-muted': !isCorrect[data.index]
                  }" class="font-weight-bold">
                    {{ data.item.part_of_speech }}
                  </div>
                  <div v-else class="text-muted">
                    ---
                  </div>
                </template>
              </b-table>


            </b-card-body>
          </b-tab>

          <b-tab title="Day 3">
            <b-card-header>
              <h5>English Image Training - Day 3</h5>
            </b-card-header>
            <b-card-body>
              <b-table :fields="fields" :items="dayThird" bordered striped hover responsive>
                <template #cell(image)="data">
                  <div v-if="data.value" class="text-center">
                    <img :src="data.value" alt="Vocabulary Image"
                      style="max-width: 150px; max-height: 150px; cursor: pointer;"
                      @click="playAudio(data.item.english)" class="img-thumbnail" />
                  </div>
                  <span v-else class="text-muted">No image</span>
                </template>

                <template #cell(no)="data">
                  <span class="font-weight-bold">{{ data.index + 1 }}</span>
                </template>

                <template #cell(english)="data">
                  <b-form-input v-model="userInputs[data.index]" :class="{
                    'is-valid': isCorrect[data.index] === true,
                    'is-invalid': isCorrect[data.index] === false
                  }" @keyup.enter="checkAnswer(data.index, data.item.english)" placeholder="Enter English word..."
                    size="sm" />
                </template>

                <template #cell(part_of_speech)="data">
                  <div v-if="showAnswer[data.index]" :class="{
                    'text-success': isCorrect[data.index],
                    'text-muted': !isCorrect[data.index]
                  }" class="font-weight-bold">
                    {{ data.item.part_of_speech }}
                  </div>
                  <div v-else class="text-muted">
                    ---
                  </div>
                </template>
              </b-table>
            </b-card-body>
          </b-tab>

          <b-tab title="Day 4">
            <b-card-header>
              <h5>English Image Training - Day 4</h5>
            </b-card-header>
            <b-card-body>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>Score: {{ correctAnswersDay4 }}/{{ dayFourth.length }}</strong>
                </div>
                <div>
                  <b-button @click="resetGame(4)" variant="secondary" size="sm" class="mr-2">
                    Reset
                  </b-button>
                  <b-button @click="showAllAnswers(4)" variant="info" size="sm">
                    Show All Answers
                  </b-button>
                </div>
              </div>
              <b-table :fields="fields" :items="dayFourth" bordered striped hover responsive>
                <template #cell(image)="data">
                  <div v-if="data.value" class="text-center">
                    <img :src="data.value" alt="Vocabulary Image"
                      style="max-width: 150px; max-height: 150px; cursor: pointer;"
                      @click="playAudio(data.item.english)" class="img-thumbnail" />
                  </div>
                  <span v-else class="text-muted">No image</span>
                </template>

                <template #cell(no)="data">
                  <span class="font-weight-bold">{{ data.index + 1 }}</span>
                </template>

                <template #cell(english)="data">
                  <b-form-input v-model="userInputs[data.index]" :class="{
                    'is-valid': isCorrect[data.index] === true,
                    'is-invalid': isCorrect[data.index] === false
                  }" @keyup.enter="checkAnswer(data.index, data.item.english)" placeholder="Enter English word..."
                    size="sm" />
                </template>

                <template #cell(part_of_speech)="data">
                  <div v-if="showAnswer[data.index]" :class="{
                    'text-success': isCorrect[data.index],
                    'text-muted': !isCorrect[data.index]
                  }" class="font-weight-bold">
                    {{ data.item.part_of_speech }}
                  </div>
                  <div v-else class="text-muted">
                    ---
                  </div>
                </template>
              </b-table>


            </b-card-body>
          </b-tab>

          <b-tab title="Day 5">
            <b-card-header>
              <h5>English Image Training - Day 5</h5>
            </b-card-header>
            <b-card-body>
              <div class="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>Score: {{ correctAnswersDay5 }}/{{ dayFiveth.length }}</strong>
                </div>
                <div>
                  <b-button @click="resetGame(5)" variant="secondary" size="sm" class="mr-2">
                    Reset
                  </b-button>
                  <b-button @click="showAllAnswers(5)" variant="info" size="sm">
                    Show All Answers
                  </b-button>
                </div>
              </div>
              <b-table :fields="fields" :items="dayFiveth" bordered striped hover responsive>
                <template #cell(image)="data">
                  <div v-if="data.value" class="text-center">
                    <img :src="data.value" alt="Vocabulary Image"
                      style="max-width: 150px; max-height: 150px; cursor: pointer;"
                      @click="playAudio(data.item.english)" class="img-thumbnail" />
                  </div>
                  <span v-else class="text-muted">No image</span>
                </template>

                <template #cell(no)="data">
                  <span class="font-weight-bold">{{ data.index + 1 }}</span>
                </template>

                <template #cell(english)="data">
                  <b-form-input v-model="userInputs[data.index]" :class="{
                    'is-valid': isCorrect[data.index] === true,
                    'is-invalid': isCorrect[data.index] === false
                  }" @keyup.enter="checkAnswer(data.index, data.item.english)" placeholder="Enter English word..."
                    size="sm" />
                </template>

                <template #cell(part_of_speech)="data">
                  <div v-if="showAnswer[data.index]" :class="{
                    'text-success': isCorrect[data.index],
                    'text-muted': !isCorrect[data.index]
                  }" class="font-weight-bold">
                    {{ data.item.part_of_speech }}
                  </div>
                  <div v-else class="text-muted">
                    ---
                  </div>
                </template>
              </b-table>


            </b-card-body>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "EnglishImageIndex",

  data() {
    return {
      fields: [
        { key: "no", label: "No", thClass: "text-center", tdClass: "text-center align-middle" },
        { key: "image", label: "Image", thClass: "text-center", tdClass: "text-center" },
        { key: "english", label: "English", thClass: "text-center", tdClass: "text-center align-middle" },
        { key: "part_of_speech", label: "Part Of Speech", thClass: "text-center", tdClass: "text-center align-middle" },
      ],
      dayFirst: [],
      daySecond: [],
      dayThird: [],
      dayFourth: [],
      dayFiveth: [],
      userInputs: {},
      isCorrect: {},
      showAnswer: {},
    };
  },

  computed: {
    correctAnswersDay1() {
      return this.dayFirst.filter((item, index) => this.isCorrect[index] === true).length;
    },
    correctAnswersDay2() {
      return this.daySecond.filter((item, index) => this.isCorrect[index] === true).length;
    },
    correctAnswersDay3() {
      return this.dayThird.filter((item, index) => this.isCorrect[index] === true).length;
    },
    correctAnswersDay4() {
      return this.dayFourth.filter((item, index) => this.isCorrect[index] === true).length;
    },
    correctAnswersDay5() {
      return this.dayFiveth.filter((item, index) => this.isCorrect[index] === true).length;
    }
  },

  mounted() {
    this.fetchVocabulary();
  },

  methods: {
    async fetchVocabulary() {
      try {
        const response = await this.$axios.$get(
          "http://localhost:8080/api/english/vocabulary",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );

        // Phân chia data theo ngày và chỉ lấy những item có image
        this.dayFirst = (response[1] || [])
          .filter(item => item.image && item.image.trim() !== '')
          .map((item, index) => ({ ...item, index }));

        this.daySecond = (response[2] || [])
          .filter(item => item.image && item.image.trim() !== '')
          .map((item, index) => ({ ...item, index: index + this.dayFirst.length }));

        this.dayThird = (response[3] || [])
          .filter(item => item.image && item.image.trim() !== '')
          .map((item, index) => ({ ...item, index: index + this.dayFirst.length + this.daySecond.length }));

        this.dayFourth = (response[4] || [])
          .filter(item => item.image && item.image.trim() !== '')
          .map((item, index) => ({ ...item, index: index + this.dayFirst.length + this.daySecond.length + this.dayThird.length }));

        this.dayFiveth = (response[5] || [])
          .filter(item => item.image && item.image.trim() !== '')
          .map((item, index) => ({ ...item, index: index + this.dayFirst.length + this.daySecond.length + this.dayThird.length + this.dayFourth.length }));

        this.initializeGame();
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    },

    initializeGame() {
      this.userInputs = {};
      this.isCorrect = {};
      this.showAnswer = {};

      const allItems = [
        ...this.dayFirst,
        ...this.daySecond,
        ...this.dayThird,
        ...this.dayFourth,
        ...this.dayFiveth
      ];

      allItems.forEach((item) => {
        this.$set(this.userInputs, item.index, '');
        this.$set(this.isCorrect, item.index, null);
        this.$set(this.showAnswer, item.index, false);
      });
    },

    checkAnswer(index, correctAnswer) {
      const userInput = this.userInputs[index].trim().toLowerCase();
      const correct = correctAnswer.toLowerCase();

      // Kiểm tra nếu input chứa đáp án đúng (có thể có nhiều từ cách nhau bằng dấu phẩy)
      const possibleAnswers = correct.split(',').map(ans => ans.trim());
      const isMatch = possibleAnswers.some(answer =>
        userInput === answer || userInput.includes(answer)
      );

      // Chỉ set isCorrect và showAnswer khi ấn Enter
      if (isMatch) {
        this.$set(this.isCorrect, index, true);
        this.$set(this.showAnswer, index, true);
        // Play audio when answer is correct
        this.playAudio(correctAnswer);
      } else {
        this.$set(this.isCorrect, index, false);
        this.$set(this.showAnswer, index, false);
      }
    },

    resetGame(day = null) {
      if (day) {
        // Reset specific day
        const dayData = this[`day${this.getDayName(day)}`];
        dayData.forEach((item) => {
          this.$set(this.userInputs, item.index, '');
          this.$set(this.isCorrect, item.index, null);
          this.$set(this.showAnswer, item.index, false);
        });
      } else {
        // Reset all days
        this.initializeGame();
      }
    },

    showAllAnswers(day = null) {
      if (day) {
        // Show answers for specific day
        const dayData = this[`day${this.getDayName(day)}`];
        dayData.forEach((item) => {
          this.$set(this.showAnswer, item.index, true);
          this.$set(this.isCorrect, item.index, true);
          this.$set(this.userInputs, item.index, item.english);
        });
      } else {
        // Show all answers
        const allItems = [
          ...this.dayFirst,
          ...this.daySecond,
          ...this.dayThird,
          ...this.dayFourth,
          ...this.dayFiveth
        ];
        allItems.forEach((item) => {
          this.$set(this.showAnswer, item.index, true);
          this.$set(this.isCorrect, item.index, true);
          this.$set(this.userInputs, item.index, item.english);
        });
      }
    },

    getDayName(dayNumber) {
      const dayNames = {
        1: 'First',
        2: 'Second',
        3: 'Third',
        4: 'Fourth',
        5: 'Fiveth'
      };
      return dayNames[dayNumber];
    },

    playAudio(text) {
      try {
        new Audio('https://translate.google.com.vn/translate_tts?ie=UTF-8&q=' + encodeURIComponent(text) + '&tl=en&client=tw-ob').play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  },
};
</script>

<style scoped>
.is-valid {
  border-color: #28a745 !important;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
}

.is-invalid {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
}

.img-thumbnail {
  border: 2px solid #dee2e6;
  border-radius: 0.5rem;
  transition: transform 0.2s;
}

.img-thumbnail:hover {
  transform: scale(1.05);
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.table td {
  vertical-align: middle;
}

.align-middle {
  vertical-align: middle !important;
}

.text-center {
  text-align: center !important;
}
</style>

<template>
  <div class="test">
    <b-row align-h="around">
      <b-col><b-form-input v-model="input.first"></b-form-input></b-col>
      <b-col><b-form-input v-model="input.second"></b-form-input></b-col>
      <b-col><b-form-input v-model="input.third"></b-form-input></b-col>
      <b-col><b-form-input v-model="input.fourth"></b-form-input></b-col>
      <b-col><b-form-input v-model="input.fiveth"></b-form-input></b-col>
      <b-col><b-button block @click="reset">Reset</b-button></b-col>
    </b-row>
    <div class="footer">2 days ago</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fiveth: "",
      },
    };
  },
  methods: {
    reset() {
      this.input.first = "";
      this.input.second = "";
      this.input.third = "";
      this.input.fourth = "";
      this.input.fiveth = "";
    },
  },
};
</script>

<style scoped>
.test {
  position: fixed;
  left: 0;
  bottom: 24px;
  width: 100%;
  color: white;
  background-color: #17a2b8;
  border-top: 1px solid #17a2b8;
  text-align: center;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
  background-color: red;
}
</style>

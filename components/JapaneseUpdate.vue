<template>
  <b-container>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Japanese:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.japanese" placeholder="Enter japanese" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Spell:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.spell" placeholder="Enter spell" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Vietnamese:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.vietnamese" placeholder="Enter vietnamese" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Example:" label-for="input-3">
        <b-form-input id="input-2" v-model="form.example" placeholder="Enter example"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>
    
<script>
export default {
  data() {
    return {
      form: {
        japanese: "",
        spell: "",
        vietnamese: "",
        example: "",
      },
    };
  },
  mounted() {
    this.fetchSomething();
  },
  methods: {
    async fetchSomething() {
      const response = await this.$axios.$get(
        "https://laravel-general.000webhostapp.com/api/japanese/vocabulary/" + this.$route.params.id
      );
      this.form = response;
    },
    async onSubmit(event) {
      event.preventDefault();
      // const response = await this.$axios.$put(
      //   "https://laravel-general.000webhostapp.com/api/japanese/vocabulary/" + this.$route.params.id,
      //   this.form
      // );

      const response = await fetch("https://laravel-general.000webhostapp.com/api/japanese/vocabulary/update/" + this.$route.params.id, {
        method: "POST",
        body: JSON.stringify(this.form),
      })

      if (response) {
        this.$router.push({ path: "/japanese" });
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.japanese = "";
      this.form.vietnamese = "";
      this.form.example = "";
    },
  },
};
</script>
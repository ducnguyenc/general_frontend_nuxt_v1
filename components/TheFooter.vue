<template>
  <div class="test">
    <b-row align-h="around">
      <b-col><b-form-input></b-form-input></b-col>
      <b-col><b-form-input></b-form-input></b-col>
      <b-col><b-form-input></b-form-input></b-col>
      <b-col><b-form-input></b-form-input></b-col>
      <b-col><b-form-input></b-form-input></b-col>
    </b-row>
    <div class="footer">2 days ago</div>
  </div>
</template>

<style scoped>
.test {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  background-color: #17a2b8;
  border-top: 1px solid #17a2b8 ;
  text-align: center;
}
.footer {
  background-color: red;
}
</style>

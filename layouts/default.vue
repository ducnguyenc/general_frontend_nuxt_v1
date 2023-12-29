<template>
  <div class="abc">
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<style>
@media screen and (min-width: 600px) {
  .abc {
    width: 100vw;
    height: 100vh;
    /* background-image: url("../static/a.jpg"); */
    background-size: cover;
  }
}

@media screen and (max-width: 600px) {
  .abc {
    width: 100vw;
    height: 100vh;
    /* background-image: url("../static/c.jpg"); */
    background-size: cover;
  }
}
</style>

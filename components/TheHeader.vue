<template>
  <div>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="/">General</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Left aligned nav items -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/english">English</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/english_training">English Training</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/english_training/speech">English Training Speech</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/japanese">Japanese</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/japanese_training">Japanese Training</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/test">Test</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style>
.navbar {
  background-color: cadetblue;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
}
</style>
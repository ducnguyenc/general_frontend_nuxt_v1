<template>
  <b-card no-body>
    <b-tabs card>
      <div v-for="item in items" v-bind:key="item">
        <b-tab :title="`Day ${item.day}`" @click="data(item.day)">
          <b-card-text>
            <b-table bordered striped hover :fields="fields" :items="dataa">
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(action)>
                <b-button>
                  <b-icon icon="info-circle"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-card-text>
        </b-tab>
      </div>
    </b-tabs>
  </b-card>
</template>

<script>
export default {
  name: "EnglishIndex",

  data() {
    return {
      dataa: null,
      items: [
        {
          text: "Admin",
          href: "#",
        },
        {
          text: "Manage",
          href: "#",
        },
        {
          text: "Library",
          active: true,
        },
      ],
      fields: ["index", "english", "spell", "vietnam", "action"],
      itemas1: [
        { english: 40, spell: "Dickerson", vietnam: "Macdonald" },
        { english: 21, spell: "Larsen", vietnam: "Shaw" },
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
      itemas2: [
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
      itemas3: [
        { english: 38, spell: "Jami", vietnam: "Carney" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
      itemas4: [{ english: 38, spell: "Jami", vietnam: "Carney" }],
      itemas5: [
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 89, spell: "Geneva", vietnam: "Wilson" },
        { english: 38, spell: "Jami", vietnam: "Carney" },
      ],
      items: [{ day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }],
    };
  },

  mounted() {
    this.dataa = this.itemas1;
  },

  methods: {
    tab1() {
      this.$router.push({ path: this.$route.path + "?tab=1" });
    },
    tab2() {
      this.$router.push({ path: this.$route.path + "?tab=2" });
    },
    tab3() {
      this.$router.push({ path: this.$route.path + "?tab=3" });
    },
    data(day) {
      if (day == 1) {
        this.dataa = this.itemas1;
      }
      if (day == 2) {
        this.dataa = this.itemas2;
      }
      if (day == 3) {
        this.dataa = this.itemas3;
      }
      if (day == 4) {
        this.dataa = this.itemas4;
      }
      if (day == 5) {
        this.dataa = this.itemas5;
      }
    },  
  },
};
</script>

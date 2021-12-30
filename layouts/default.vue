<template>
  <v-app>
    <v-snackbar
      color="red accent-2"
      v-model="showErrors"
    >
      <div
        v-for="(error, index) in getErrors()"
        :key="index"
      >
        {{error}}
      </div>
    </v-snackbar>
    <FiltersDrawer
      :open="filtersDrawer"
    ></FiltersDrawer>
    <EditDrawer
      :open="editDrawer"
      :editMode="editMode"
    ></EditDrawer>
    <v-app-bar fixed app>
      <v-btn icon @click.stop="openFiltersDrawer()">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      filtersDrawer: false,
      showErrors: false,
    }
  },
  mounted(){
    this.$store.dispatch("employee/getAllEmployees", {
      filters: {},
      paginator: {}
    })
  },
  computed: {
    editDrawer() {
      return this.getEditDrawer();
    },
    editMode() {
      return this.getIsEditMode();
    },
    computedErrors() {
      return this.getErrors();
    }
  },
  watch: {
    computedErrors(val) {
      this.showErrors = val;
    }
  },
  methods: {
    ...mapGetters({
      getFilterDrawer: 'general/getFilterDrawer',
      getEditDrawer: 'general/getCreateEditDrawer',
      getIsEditMode: 'general/getIsEditMode',
      getErrors: 'employee/getErrors',
    }),
    ...mapMutations({
      setFiltersDrawer: 'general/setFiltersDrawer',
    }),
    openFiltersDrawer() {
      this.filtersDrawer = !this.filtersDrawer;
    }
  }
}
</script>

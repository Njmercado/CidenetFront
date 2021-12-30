<template>
  <v-app>
    <!-- Error notifications -->
    <v-snackbar
      :color="showErrors? 'red accent-2': showSuccessMessage? 'success': ''"
      v-model="openNotifications"
    >
      <div
        v-for="(notification, index) in notifications"
        :key="index"
      >
        {{notification}}
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
        <v-icon v-if="!filtersDrawer">mdi-filter</v-icon>
        <v-icon v-else>mdi-close</v-icon>
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
      showSuccessMessage: false,
      openNotifications: false,
      notifications: "" || [],
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
    },
    computedSuccessMessage() {
      return this.getSuccessMessage();
    }
  },
  watch: {
    computedErrors(val) {
      this.showErrors = val;
      this.openNotifications = true;
      this.notifications = val;
      console.log("Errors: ")
      console.log(val)
    },
    computedSuccessMessage(val) {
      this.showSuccessMessage = val;
      this.openNotifications = true;
      this.notifications = val;
      console.log("Success: ")
      console.log(val)
    }
  },
  methods: {
    ...mapGetters({
      getFilterDrawer: 'general/getFilterDrawer',
      getEditDrawer: 'general/getCreateEditDrawer',
      getIsEditMode: 'general/getIsEditMode',
      getErrors: 'employee/getErrors',
      getSuccessMessage: 'employee/getSuccessMessage'
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

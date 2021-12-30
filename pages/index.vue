<template>
  <v-container>
    <!-- content -->
    <v-row justify="center">
      <v-col
        cols="10"
        xs="5"
        s="4"
        md="3"
        lg="3"
        xl="3"
        v-for="(employee, index) in getEmployees()"
        :key="index"
      >
      <Employee :info="employee"></Employee>
      </v-col>
    </v-row>
    <v-btn
      fab
      style="position: absolute; bottom: 2rem; right: 2rem"
      @click="openCreateDrawer()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { EmployeeModel } from '../model/models/employee.model'
import { CountryEnum } from '../model/enums/enums';
import { mapMutations, mapGetters } from 'vuex'

export default Vue.extend({
  data() {
    return {
    }
  },
  methods: {
    ...mapGetters({
      getEmployees: 'employee/getEmployees'
    }),
    ...mapMutations({
      setCreateEditDrawer: 'general/setCreateEditDrawer',
      setIsEditMode: "general/setIsEditMode",
      setEmployee: 'employee/setCurrentEmployee'
    }),
    openCreateDrawer() {
      this.setEmployee(new EmployeeModel("", "", "", 0, 0, new Date(), "", 0, "", undefined, ""));
      this.setIsEditMode(false);
      this.setCreateEditDrawer(true);
    }
  }
})
</script>

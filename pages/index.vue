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
        v-for="(employee, index) in employees"
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
import { mapMutations } from 'vuex'

export default Vue.extend({
  data() {
    return {
      employees: [
        new EmployeeModel(
          "JUAN",
          "DE LA TORRE",
          "CONSUEGRA",
          CountryEnum["Colombia" as keyof typeof CountryEnum],
          1,
          new Date(2020, 1, 1),
          "1",
          1,
          "",
          "juan.delatorre@cidenet.com.co"
        ),
        new EmployeeModel(
          "JUAN",
          "DE LA TORRE",
          "CONSUEGRA",
          CountryEnum["Colombia" as keyof typeof CountryEnum],
          1,
          new Date(2020, 1, 1),
          "1",
          1,
          "",
          "juan.delatorre@cidenet.com.co"
        ),
        new EmployeeModel(
          "JUAN",
          "DE LA TORRE",
          "CONSUEGRA",
          CountryEnum["Colombia" as keyof typeof CountryEnum],
          1,
          new Date(2020, 1, 1),
          "1",
          1,
          "",
          "juan.delatorre@cidenet.com.co"
        ),
        new EmployeeModel(
          "JUAN",
          "DE LA TORRE",
          "CONSUEGRA",
          CountryEnum["Colombia" as keyof typeof CountryEnum],
          1,
          new Date(2020, 1, 1),
          "1",
          1,
          "",
          "juan.delatorre@cidenet.com.co"
        ),
      ]
    }
  },
  methods: {
    ...mapMutations({
      setFiltersDrawer: 'general/setFilterDrawer'
    }),
    openCreateDrawer() {
      this.setFiltersDrawer(true);
    }
  }
})
</script>

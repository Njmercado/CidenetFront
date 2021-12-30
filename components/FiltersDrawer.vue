<template>
  <v-navigation-drawer
      v-model="localOpen"
      fixed
      app
  >
    <div style="margin-top: 16px; font-size: 40px; text-align: center;">Filtros</div>
    <v-list>
      <v-list-item>
        <v-select
          v-model="filters.idType"
          outlined
          label="Tipo de identificación"
          :items="getAllIDTypes()"
          dense
        ></v-select>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="filters.idNumber"
          outlined
          label="Número identificación"
          dense
          :rules="[rules.counter, rules.numeric]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="filters.firstname"
          outlined
          label="Nombre"
          dense
          :rules="[rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="filters.surname"
          outlined
          label="Apellido"
          dense
          :rules="[rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="filters.secondSurname"
          outlined
          label="Segundo apellido"
          dense
          :rules="[rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="filters.othersnames"
          outlined
          label="Otros nombres"
          dense
          :rules="[rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-select
          v-model="filters.area"
          outlined
          label="Area"
          :items="getAllAreas()"
          dense
        ></v-select>
      </v-list-item>

      <v-list-item>
        <v-select
          v-model="filters.country"
          outlined
          label="Pais"
          :items="getAllCountries()"
          dense
        ></v-select>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="filters.email"
          outlined
          label="Email"
          dense
          :rules="[rules.email]"
        ></v-text-field>
      </v-list-item>

      <v-list-item-action style="width: 100%">
        <v-row justify="space-around" align="center" style="width: inherit">
          <v-btn
            color="blue"
            style="color: white; text-transform: lowercase; margin-left: -25px;"
            dense
            rounded
            @click="filterResults()"
          >filtrar</v-btn>
          <v-btn
            color="success"
            style="color: white; text-transform: lowercase;"
            dense
            rounded
            @click="cleanResults()"
          >limpiar</v-btn>
        </v-row>
      </v-list-item-action>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { IDTypeEnum, CountryEnum, AreaEnum } from '../model/enums/enums';
import { mapGetters } from 'vuex'
import { Paginator, RestEmployee } from '~/model/models/rest.employee.model';
import { IEmployee } from '~/model/interfaces/employee.interface';
import { EmployeeModel } from '~/model/models/employee.model';
import { TextFieldRules } from '@/utils/rules'

export default Vue.extend({
  data() {
    return {
      localOpen: false,
      filters: {
        _id: "",
        idNumber: "",
        firstname: "",
        surname: "",
        secondSurname: "",
        othersnames: "",
        email: "",
        country: "",
        idType: "",
        area: "",
      },
      rules: {}
    }
  },
  mounted() {
    this.rules = TextFieldRules();
  },
  props: {
    open: {
      type: Boolean
    }
  },
  watch: {
    open(val) {
      this.localOpen = !this.localOpen
    },
  },
  methods: {
    ...mapGetters({
      getEmployees: "employee/getEmployees"
    }),
    getAllIDTypes() {
      const idTypes = Object.values(IDTypeEnum);
      return idTypes.slice(0, idTypes.length / 2)
    },
    getAllCountries() {
      const countries = Object.values(CountryEnum);
      return countries.slice(0, countries.length / 2)
    },
    getAllAreas() {
      const areas = Object.values(AreaEnum);
      return areas.slice(0, areas.length / 2)
    },
    async filterResults(){

      const newIDType = IDTypeEnum[this.filters.idType as keyof typeof IDTypeEnum]
      const newCountry = CountryEnum[this.filters.country as keyof typeof CountryEnum]
      const newArea = AreaEnum[this.filters.area as keyof typeof AreaEnum]

      const employeeModel = new EmployeeModel(
        this.filters.firstname,
        this.filters.surname,
        this.filters.secondSurname,
        newCountry,
        newIDType
      );

      employeeModel.idNumber = this.filters.idNumber;
      employeeModel.area = newArea;
      employeeModel.othersnames = this.filters.othersnames;
      employeeModel.email = this.filters.email;

      const restEmployee = new RestEmployee(employeeModel)

      await this.$store.dispatch('employee/getAllEmployees', await restEmployee.getAllDataAsJson())

      const response = await this.getEmployees();
    },
    cleanResults() {
      this.filters = {
        _id: "",
        idNumber: "",
        firstname: "",
        surname: "",
        secondSurname: "",
        othersnames: "",
        email: "",
        country: "",
        idType: "",
        area: "",
      };
      this.filterResults();
    }
  }
})
</script>

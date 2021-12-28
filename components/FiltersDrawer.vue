<template>
  <v-navigation-drawer
      v-model="localOpen"
      fixed
      app
  >
    <div style="margin-top: 16px; font-size: 40px; text-align: center;">Filtros</div>
    <v-list>
      <v-list-item>
        <v-select v-model="idType" outlined label="Tipo de identificación" :items="getAllIDTypes()" dense></v-select>
      </v-list-item>

      <v-list-item>
        <v-text-field v-model="_id" outlined label="Número identificación" dense></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field v-model="firstname" outlined label="Nombre" dense></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field v-model="surname" outlined label="Apellido" dense></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field v-model="secondSurname" outlined label="Segundo apellido" dense></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field v-model="othersnames" outlined label="Otros nombres" dense></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-select v-model="area" outlined label="Area" :items="getAllAreas()" dense></v-select>
      </v-list-item>

      <v-list-item>
        <v-select v-model="country" outlined label="Pais" :items="getAllCountries()" dense></v-select>
      </v-list-item>

      <v-list-item>
        <v-text-field v-model="email" outlined label="Email" dense></v-text-field>
      </v-list-item>
      <v-list-item-action>
        <v-btn dense rounded @click="filterResults()">filtrar</v-btn>
      </v-list-item-action>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { IDTypeEnum, CountryEnum, AreaEnum } from '../model/enums/enums';
import { mapGetters } from 'vuex'
import { Paginator, RestEmployee } from '~/model/models/rest.employee.model';
export default Vue.extend({
  data() {
    return {
      localOpen: false,
      _id: "",
      firstname: "",
      surname: "",
      secondSurname: "",
      othersnames: "",
      email: "",
      country: "",
      idType: "",
      area: "",
    }
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
      return countries.slice(0, countries.length)
    },
    getAllAreas() {
      const areas = Object.values(AreaEnum);
      return areas.slice(0, areas.length / 2)
    },
    async filterResults(){
      await this.$store.dispatch('employee/getAllEmployees', {
        payload: new RestEmployee(undefined, new Paginator(2, 100))
      })

      const response = await this.getEmployees();

      console.log(response)
    }
  }
})
</script>

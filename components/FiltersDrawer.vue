<template>
  <v-navigation-drawer
      v-model="localOpen"
      fixed
      app
  >
    <div style="margin-top: 16px; font-size: 40px; text-align: center;">Filtros</div>
    <v-list>
      <v-list-item v-for="(filter, index) in filters" :key="index">
        <v-text-field :v-model="filter.variable" outlined :label="filter.name" dense></v-text-field>
      </v-list-item>
      <v-list-action>
        <v-btn>filtrar</v-btn>
      </v-list-action>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      localOpen: false,
      filters: [
        {

          variable: "",
          name: "Nombre"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
        {
          variable: "",
          name: "Primer apellido"
        },
      ]
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
  }
})
</script>

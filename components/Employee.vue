<template>
  <v-card style="cursor: pointer" @click="openDrawerEmployeeInfo">
    <v-card-title>

    </v-card-title>
    <v-card-text>
      <v-row>
        {{info.firstname}}
      </v-row>
      <v-row>
        {{info.email}}
      </v-row>
      <v-row>
        {{getArea(info.area)}}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { EmployeeModel } from '../model/models/employee.model'
import { CountryEnum, AreaEnum } from '../model/enums/enums';

export default Vue.extend({
  props: {
    info: {
      type: Object as () => EmployeeModel
    }
  },
  methods: {
    getArea(areaID: number) {
      return AreaEnum[areaID]
    }
  }
})
</script>

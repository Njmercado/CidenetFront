<template>
  <v-card
    style="cursor: pointer; border-radius: 16px; padding: 4px 8px"
    @click="openDrawerEmployeeInfo"
    elevation="2"
  >
    <v-card-title>
      <div class="text-center" style="width: 100%;">
        <v-icon style="font-size: 50px">mdi-account</v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        {{getFullName(info)}}
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
    },
    getFullName(info: EmployeeModel) {
      return `${info.firstname} ${info.surname} ${info.secondSurname} ${info.othersnames}`;
    }
  }
})
</script>

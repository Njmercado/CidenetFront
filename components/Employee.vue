<template>
  <v-card
    color="#385F73"
    style="cursor: pointer; border-radius: 16px; padding: 8px 16px"
    height="250px"
    @click="openDrawerEmployeeInfo"
    elevation="2"
  >
    <v-card-title>
      <div class="text-center" style="width: 100%;">
        <v-icon style="font-size: 100px">mdi-account</v-icon>
      </div>
    </v-card-title>
    <v-card-text class="white--text mt-12">
      <v-row>
        <div style="font-size: 20px; font-weight: bold">
          {{getFullName(info)}}
        </div>
      </v-row>
      <v-row>
        {{getArea(info.area)}}
      </v-row>
      <v-row>
        <div style="font-size: 15px">
          {{info.email}}
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { EmployeeModel } from '../model/models/employee.model'
import { mapMutations } from 'vuex'
import { CountryEnum, AreaEnum } from '../model/enums/enums';

export default Vue.extend({
  props: {
    info: {
      type: Object as () => EmployeeModel
    }
  },
  methods: {
    ...mapMutations({
      setCreateEditDrawer: 'general/setCreateEditDrawer',
      setIsEditMode: 'general/setIsEditMode',
      setCurrentEmployee: 'employee/setCurrentEmployee'
    }),
    getArea(areaID: number) {
      return AreaEnum[areaID]
    },
    getFullName(info: EmployeeModel) {
      return `${info.firstname} ${info.surname} ${info.secondSurname} ${info.othersnames}`;
    },
    openDrawerEmployeeInfo() {
      this.setIsEditMode(true)
      this.setCurrentEmployee(this.info)
      this.setCreateEditDrawer(true)
    }
  }
})
</script>

<template>
  <v-container>
    <!-- content -->
    <v-row v-if="getEmployees().length > 0" justify="center" align="center" style="heigh: 90vh">
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
    <v-row v-else justify="center" align="center" style="height: 90vh">
      <v-col align="center">
        <div class="text-h3">
          Aún no tienes empleados dentro de tu nómina
        </div>
        <div class="text-h5 mt-2">
          Animate y contrata uno!!
        </div>
      </v-col>
    </v-row>
    <div v-if="!isEditMode">
      <v-btn
        v-if="!isDrawerInCreateOpen"
        fab
        color="success"
        style="position: absolute; bottom: 2rem; right: 2rem"
        @click="openCreateDrawer()"
      >
        <v-icon size="32">mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-else
        fab
        color="error"
        style="position: absolute; bottom: 2rem; right: 2rem"
        @click="closeCreateDrawer()"
      >
        <v-icon size="32">mdi-close</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-btn
        fab
        color="error"
        style="position: absolute; bottom: 2rem; right: 2rem"
        @click="closeCreateDrawer()"
      >
        <v-icon size="32">mdi-close</v-icon>
      </v-btn>
    </div>
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
      isDrawerInCreateOpen: false,
      isEditMode: false
    }
  },
  computed: {
    computedEditMode(): boolean {
      return this.getIsEditMode();
    }
  },
  watch: {
    computedEditMode(val) {
      this.isEditMode = val;
    }
  },
  methods: {
    ...mapGetters({
      getEmployees: 'employee/getEmployees',
      getIsEditMode: 'general/getIsEditMode'
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
      this.isDrawerInCreateOpen = true;
    },
    closeCreateDrawer() {
      this.setEmployee(new EmployeeModel("", "", "", 0, 0, new Date(), "", 0, "", undefined, ""));
      this.setIsEditMode(false);
      this.setCreateEditDrawer(false);
      this.isDrawerInCreateOpen = false;
      this.isEditMode = false;
    }
  }
})
</script>

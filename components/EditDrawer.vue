<template>
  <v-navigation-drawer
      v-model="localOpen"
      fixed
      app
      right
    >
    <div>
      <v-icon @click="closeEditDrawer()">mdi-close</v-icon>
    </div>
    <div style="margin-top: 16px; font-size: 40px; text-align: center;">
      {{editMode? "Edición" : "Creación"}}
    </div>
    <v-list>
      <v-list-item>
        <v-text-field v-model="fields.othersnames" outlined label="Otros nombres" dense></v-text-field>
      </v-list-item>
      <v-list-item>
        <v-text-field v-model="fields.email" outlined label="Email" dense></v-text-field>
      </v-list-item>
      <v-list-item-action>
        <div v-if="editMode">
          <v-btn dense rounded @click="cancel()">Cancelar</v-btn>
          <v-btn dense rounded @click="save()">Guardar</v-btn>
        </div>
        <div v-else>
          <v-btn dense rounded @click="create()">Crear</v-btn>
        </div>
      </v-list-item-action>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
export default Vue.extend({
  data() {
    return {
      localOpen: false,
      employee: {},
      fields: {
        othersnames: "",
        email: ""
      }
    }
  },
  props: {
    open: {
      type: Boolean
    },
    editMode: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    open(val) {
      this.localOpen = !this.localOpen
      if(this.editMode) {
        this.fields = this.currentEmployee();
      }
    },
  },
  methods: {
    ...mapMutations({
      setCreateEditDrawer: 'general/setCreateEditDrawer',
      setIsEditMode: 'general/setIsEditMode',
    }),
    ...mapGetters({
      currentEmployee: 'employee/getCurrentEmployee'
    }),
    closeEditDrawer() {
      this.setIsEditMode(false);
      this.setCreateEditDrawer(false)
    },
    save() {
      console.log("")
    },
    cancel() {
      this.closeEditDrawer()
    },
    create() {
      console.log("")
    }
  }
})
</script>

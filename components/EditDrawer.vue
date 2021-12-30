<template>
  <v-navigation-drawer
      v-model="localOpen"
      fixed
      app
      right
    >
    <div style="margin-top: 16px; font-size: 40px; text-align: center;">
      {{editMode? "Edición" : "Creación"}}
    </div>
    <v-list>
      <v-list-item>
        <v-select
          v-model="fields.idType"
          outlined
          label="Tipo de identificación"
          :items="getAllIDTypes()"
          dense
        ></v-select>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="fields.idNumber"
          outlined
          label="Número identificación"
          dense
          :rules="[rules.required, rules.counter]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="fields.firstname"
          outlined
          label="Nombre"
          dense
          :rules="[rules.required, rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="fields.surname"
          outlined
          label="Apellido"
          dense
          :rules="[rules.required, rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="fields.secondSurname"
          outlined
          label="Segundo apellido"
          dense
          :rules="[rules.required, rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-text-field
          v-model="fields.othersnames"
          outlined
          label="Otros nombres"
          dense
          :rules="[rules.counter, rules.uppercase]"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-select
          v-model="fields.area"
          outlined
          label="Area"
          :items="getAllAreas()"
          dense
        ></v-select>
      </v-list-item>

      <v-list-item>
        <v-select
          v-model="fields.country"
          outlined
          label="Pais"
          :items="getAllCountries()"
          dense
        ></v-select>
      </v-list-item>

      <v-list-item-action style="width: 100%">
        <v-row justify="center" align="center" style="width: inherit">
          <div v-if="editMode">
            <v-btn
              color="error"
              style="text-tranform: lowercase"
              dense
              rounded
              @click="deleteEmployee()"
            >Eliminar</v-btn>
            <v-btn
              color="blue"
              style="color: white; text-tranform: lowercase;"
              dense
              rounded
              @click="update()"
            >Actualizar</v-btn>
          </div>
          <div v-else>
            <v-btn
              color="success"
              style="text-transform: lowercase"
              dense
              rounded
              @click="create()"
            >Crear</v-btn>
          </div>
        </v-row>
      </v-list-item-action>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { IDTypeEnum, CountryEnum, AreaEnum } from '../model/enums/enums';
import { TextFieldRules } from '@/utils/rules';

export default Vue.extend({
  data() {
    return {
      localOpen: false,
      rules: {},
      fields: {
        _id: "",
        idNumber: "",
        firstname: "",
        surname: "",
        secondSurname: "",
        othersnames: "",
        country: "COLOMBIA" as string | number,
        idType: "CEDULA_CIUDADANIA" as string | number,
        admissionDate: new Date(),
        area: "ADMINISTRACION" as string | number,
        registerDate: ""
      }
    }
  },
  mounted() {
    this.rules = TextFieldRules();
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
      this.fields = {...this.currentEmployee()};

      if(this.editMode) {

        // I cast values brought from DB as Number to their corresponding enum
        const country = this.getAllCountries()[Number.parseInt(this.fields.country as string)];
        const idType = this.getAllIDTypes()[Number.parseInt(this.fields.idType as string)];
        const area = this.getAllAreas()[Number.parseInt(this.fields.area as string)];

        this.fields.country = country as string;
        this.fields.area = area as string;
        this.fields.idType = idType as string;
      }
    },
  },
  methods: {
    ...mapMutations({
      setCreateEditDrawer: 'general/setCreateEditDrawer',
      setIsEditMode: 'general/setIsEditMode',
    }),
    ...mapGetters({
      currentEmployee: 'employee/getCurrentEmployee',
      getErrors: "employee/getErrors"
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
    update() {

      const fieldsCopy = {...this.fields}

      const newIDType = IDTypeEnum[fieldsCopy.idType.toString() as keyof typeof IDTypeEnum]
      const newArea = AreaEnum[fieldsCopy.area.toString() as keyof typeof AreaEnum]
      const country: CountryEnum = CountryEnum[fieldsCopy.country.toString() as keyof typeof CountryEnum]

      fieldsCopy.idType = newIDType as number;
      fieldsCopy.area = newArea as number;
      fieldsCopy.country = country as number;

      this.$store.dispatch("employee/updateEmployee", fieldsCopy)
    },
    deleteEmployee() {

      if(window.confirm(`Estás seguro/a de eliminar el empleado: ${this.fields.firstname} ${this.fields.surname}`)) {
        this.$store.dispatch("employee/deleteEmployee", this.fields._id)
      }
    },
    create() {

      const newIDType = IDTypeEnum[this.fields.idType.toString() as keyof typeof IDTypeEnum]
      const newArea = AreaEnum[this.fields.area.toString() as keyof typeof AreaEnum]
      const country: CountryEnum = CountryEnum[this.fields.country.toString() as keyof typeof CountryEnum]

      this.fields.idType = newIDType as number;
      this.fields.area = newArea as number;
      this.fields.country = country as number;

      this.$store.dispatch("employee/createEmployee", this.fields)
    }
  }
})
</script>

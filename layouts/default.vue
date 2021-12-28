<template>
  <v-app>
    <FiltersDrawer
      :open="filtersDrawer"
    ></FiltersDrawer>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="openFiltersDrawer()">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      filtersDrawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  methods: {
    ...mapGetters({
      getFilterDrawer: 'general/getFilterDrawer'
    }),
    ...mapMutations({
      setFiltersDrawer: 'general/setFiltersDrawer'
    }),
    openFiltersDrawer() {
      this.filtersDrawer = !this.filtersDrawer;
    }
  }
}
</script>

export const state = () => ({
  filterDrawer: Boolean,
  createEditDrawer: Boolean
})

export const getters = {
  getFilterDrawer(state: any) {
    return state.filterDrawer;
  },
  getCreateEditDrawer(state: any) {
    return state.createEditDrawer;
  },
}

export const mutations = {
  setFilterDrawer(state: any, filter: Boolean) {
    state.filterDrawer = filter;
  },
  setCreateEditDrawer(state: any, filter: Boolean) {
    state.createEditDrawer = filter;
  }
}

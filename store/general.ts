export const state = () => ({
  filterDrawer: Boolean,
  createEditDrawer: Boolean,
  isEditMode: Boolean
})

export const getters = {
  getFilterDrawer(state: any): boolean {
    return state.filterDrawer;
  },
  getCreateEditDrawer(state: any): boolean {
    return state.createEditDrawer;
  },
  getIsEditMode(state: any): boolean {
    return state.isEditMode;
  }
}

export const mutations = {
  setFilterDrawer(state: any, filter: Boolean) {
    state.filterDrawer = filter;
  },
  setCreateEditDrawer(state: any, filter: Boolean) {
    state.createEditDrawer = filter;
  },
  setIsEditMode(state: any, mode: boolean) {
    state.isEditMode = mode
  }
}

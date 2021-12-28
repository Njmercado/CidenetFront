import { IEmployee } from '../model/interfaces/employee.interface';
import { GET_EMPLOYEES } from '@/utils/routes.json'
import { RestEmployee } from '@/model/models/rest.employee.model'
import axios from 'axios'

export const state = () => ({
  employees: Array<IEmployee>(),
  errors: String
})

export const getters = {
  getEmployees(state: any) {
    return state.employees;
  },
  getErrors(state: any) {
    return state.errors;
  }
}

export const mutations = {
  setEmployees(state: any, employees: Array<IEmployee>) {
    state.employees = employees;
  },
  setError(state: any, error: string) {
    state.error = error;
  }
}

export const actions = {
  async getAllEmployees(context: any, payload: RestEmployee) {
    console.log(payload)
    const page = payload.paginator?.page || 0
    const documents = payload.paginator?.documents || 10

    const finalURL = `${GET_EMPLOYEES}?page=${page}&documents=${documents}`
    const filters =  payload.getFiltersAsJson()

    const response = await axios.get(finalURL, filters)

    console.log("RESPONSE: ")
    console.log(response)

    if(response.data.Error) {
      context.commit("setError", response.data.Data)
    } else {
      context.commit('setEmployees', response.data.Data)
    }
  }
}

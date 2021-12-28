import { IEmployee } from '../model/interfaces/employee.interface';
import { GET_EMPLOYEES } from '@/utils/routes.json'
import { RestEmployee } from '@/model/models/rest.employee.model'
import axios from 'axios'
import { EmployeeModel } from '~/model/models/employee.model';

export const state = () => ({
  employees: Array<IEmployee>(),
  currentEmployee: EmployeeModel,
  errors: String
})

export const getters = {
  getEmployees(state: any) {
    return state.employees;
  },
  getErrors(state: any) {
    return state.errors;
  },
  getCurrentEmployee(state: any) {
    return state.currentEmployee;
  }
}

export const mutations = {
  setEmployees(state: any, employees: Array<IEmployee>) {
    state.employees = employees;
  },
  setError(state: any, error: string) {
    state.error = error;
  },
  setCurrentEmployee(state: any, employee: EmployeeModel) {
    state.currentEmployee = employee;
  }
}

export const actions = {
  async getAllEmployees(context: any, payload: any) {
    const page = payload.paginator?.page || 0
    const documents = payload.paginator?.documents || 10

    const finalURL = `${GET_EMPLOYEES}?page=${page}&documents=${documents}`
    const filters =  payload.filters

    const response = await axios.get(finalURL, {
      params: filters
    })

    if(response.data.Error) {
      context.commit("setError", response.data.Data)
    } else {
      context.commit('setEmployees', response.data.Data)
    }
  }
}

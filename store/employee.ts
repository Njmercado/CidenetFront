import { IEmployee } from '../model/interfaces/employee.interface';
import { EMPLOYEES } from '@/utils/routes.json'
import axios from 'axios'
import { EmployeeModel } from '~/model/models/employee.model';

export const state = () => ({
  employees: Array<IEmployee>(),
  currentEmployee: EmployeeModel,
  errors: Array<String>(),
  setSuccessMessage: String,
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
  setError(state: any, errors: Array<String>) {
    state.errors = errors;
  },
  setSuccessMessage(state: any, message: String) {
    state.successMessage = message;
  },
  setCurrentEmployee(state: any, employee: EmployeeModel) {
    state.currentEmployee = employee;
  }
}

export const actions = {
  async getAllEmployees(context: any, payload: any) {
    const page = payload.paginator?.page || 0
    const documents = payload.paginator?.documents || 10

    const finalURL = `${EMPLOYEES}?page=${page}&documents=${documents}`
    const filters =  payload.filters

    const response = await axios.get(finalURL, {
      params: filters
    })

    if(response.data.Error) {
      context.commit("setError", response.data.Message)
    } else {
      context.commit('setEmployees', response.data.Data)
    }
  },
  async createEmployee(context: any, payload: any) {

    payload.area = Number.parseInt(payload.area)
    payload.country = Number.parseInt(payload.country)
    payload.idType = Number.parseInt(payload.idType)

    const response = await axios.post(`${EMPLOYEES}`, payload)

    if(response.data.Error) {
      context.commit("setError", response.data.Message)
    }
  },
  async deleteEmployee(context: any, payload: any) {
    const response = await axios.delete(`${EMPLOYEES}`, {
      params:{
        _id: payload
      }
    })

    if(response.data.Error) {
      context.commit("setError", response.data.Message)
    }
  },
  async updateEmployee(context: any, payload: any) {
    axios.put(`${EMPLOYEES}`, payload)
      .then(response => {

        if(response.data.Error) {
          context.commit("setError", response.data.Message)
        }
      })
      .catch(error => {
        context.commit("setError", error.data.Message)
      })
  }
}

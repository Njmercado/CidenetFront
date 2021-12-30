import { IEmployee } from '../model/interfaces/employee.interface';
import { EMPLOYEES } from '@/utils/routes.json'
import axios from 'axios'
import { EmployeeModel } from '~/model/models/employee.model';

export const state = () => ({
  employees: Array<IEmployee>(),
  currentEmployee: EmployeeModel,
  errors: Array<String>(),
  successMessage: String,
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
  },
  getSuccessMessage(state: any) {
    return state.successMessage;
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
  },
  deleteLocalEmployee(state: any, _id: string) {
    let index = -1

    state.employees.find((employee: any, i: any) => {
      index = i;
      return employee._id === _id;
    })

    if(index > -1) {
      state.employees.splice(index, 1)
    }
  },
  appendLocalEmployee(state: any, employee: any) {
    state.employees.push(employee);
  },
  updateLocalEmployee(state: any, employee: any) {
    let index = -1

    state.employees.find((localEmployee: any, i: any) => {
      index = i;
      return localEmployee._id === employee._id;
    })

    if(index > -1) {
      state.employees[index] = employee
    }
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
      context.commit("setSuccessMessage", false)
      context.commit("setError", response.data.Message)
    } else {
      context.commit("setError", false)
      context.commit('setEmployees', response.data.Data)
    }
  },
  async createEmployee(context: any, payload: any) {

    payload.area = Number.parseInt(payload.area)
    payload.country = Number.parseInt(payload.country)

    const response = await axios.post(`${EMPLOYEES}`, payload)

    if(response.data.Error) {
      context.commit("setSuccessMessage", false)
      context.commit("setError", response.data.Message)
    } else {
      context.commit("setError", false)
      context.commit("setSuccessMessage", response.data.Message)
      context.commit("appendLocalEmployee", payload)
    }
  },
  async deleteEmployee(context: any, payload: any) {
    const response = await axios.delete(`${EMPLOYEES}`, {
      params:{
        _id: payload
      }
    })

    if(response.data.Error) {
      context.commit("setSuccessMessage", false)
      context.commit("setError", response.data.Message)
    } else {
      context.commit("setError", false)
      context.commit("setSuccessMessage", response.data.Message)
      context.commit("deleteLocalEmployee", payload)
    }
  },
  async updateEmployee(context: any, payload: any) {
    axios.put(`${EMPLOYEES}`, payload)
      .then(response => {

        if(response.data.Error) {
          context.commit("setSuccessMessage", false)
          context.commit("setError", response.data.Message)
        } else {
          context.commit("setError", false)
          context.commit("setSuccessMessage", response.data.Message)
          context.commit("updateLocalEmployee", payload)
        }
      })
      .catch(error => {
        context.commit("setError", error.data.Message)
      })
  }
}

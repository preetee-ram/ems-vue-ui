import axios from "axios";
import { EmployeeModel } from "./EmployeeModel";

const API_BASE_URL = "http://localhost:8080/employees";

export const EmployeeService = {
  async getEmployees() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  },

  async addEmployee(employee) {
    const validationErrors = EmployeeModel.validate(employee);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }

    try {
      const response = await axios.post(API_BASE_URL, employee);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add employee");
    }
  },

  async updateEmployee(employee) {
    const validationErrors = EmployeeModel.validate(employee);
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/${employee.employeeId}`,
        employee
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update employee");
    }
  },

  async deleteEmployee(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete employee");
    }
  },
};

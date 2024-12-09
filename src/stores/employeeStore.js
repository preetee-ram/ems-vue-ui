import { defineStore } from "pinia";
import { EmployeeModel } from "@/services/EmployeeModel";
import { EmployeeService } from "@/services/EmployeeService";

export const useEmployeeStore = defineStore("employeeStore", {
  state: () => ({
    employees: [],
    loading: false,
    error: null,
    validationErrors: {},
  }),
  getters: {
    hasError: (state) =>
      state.error || Object.keys(state.validationErrors).length,
  },

  actions: {
    async fetchEmployees() {
      this.loading = true;
      try {
        this.employees = await EmployeeService.getEmployees();
      } catch (err) {
        this.error = "Failed to fetch Employees";
      } finally {
        this.loading = false;
      }
    },
    async addEmployee(newEmployee) {
      const errors = EmployeeModel.validate(newEmployee);
      if (Object.keys(errors).length > 0) {
        this.validationErrors = errors;
        return;
      }

      try {
        const result = await EmployeeService.addEmployee(newEmployee);
        this.employees.push(result);
        this.clearErrors();
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async updateEmployee(updatedEmployee) {
      const errors = EmployeeModel.validate(updatedEmployee);
      if (Object.keys(errors).length > 0) {
        this.validationErrors = errors;
        return;
      }

      try {
        const result = await EmployeeService.updateEmployee(updatedEmployee);
        console.log("inside updateEmployee");

        // If valid, update the employee
        const index = this.employees.findIndex(
          (emp) => emp.employeeId === updatedEmployee.employeeId
        );
        if (index !== -1) {
          this.employees[index] = { ...updatedEmployee };
          this.clearErrors();
        } else {
          this.error = "Employee not found";
        }
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async deleteEmployee(id) {
      try {
        await EmployeeService.deleteEmployee(id);
        this.employees = this.employees.filter((emp) => emp.employeeId !== id);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    async clearErrors() {
      this.validationErrors = {}; // Clear errors
      this.error = null;
    },
  },
});

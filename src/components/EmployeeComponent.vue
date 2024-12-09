<script setup>
import { useEmployeeStore } from "../stores/employeeStore";
import EmployeeForm from "./EmployeeForm.vue";
import { ref } from "vue";
import EmployeeTable from "./EmployeeTable.vue";

const employeeStore = useEmployeeStore();

const newEmployee = ref({
  name: "",
  age: "",
  address: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
});
const editingEmployee = ref(null);

const fetchEmployees = async () => {
  await employeeStore.fetchEmployees();
};

const addEmployee = async () => {
  console.log("Adding newEmployee", newEmployee.value);
  await employeeStore.addEmployee(newEmployee.value);
  if (!employeeStore.hasError) resetForm();
};
const updateEmployee = async () => {
  console.log("updating editingEmployee", editingEmployee.value);
  await employeeStore.updateEmployee(editingEmployee.value);
  if (!employeeStore.hasError) cancelEdit();
};
const deleteEmployee = async (id) => {
  console.log("deleting id", id);
  await employeeStore.deleteEmployee(id);
};
const editEmployee = (id) => {
  employeeStore.clearErrors();
  const emp = employeeStore.employees.find((e) => e.employeeId === id);
  if (emp) {
    editingEmployee.value = { ...emp }; // Create a copy
  }
};
const resetForm = () => {
  clearForm();
  employeeStore.clearErrors();
};
const cancelEdit = () => {
  clearForm();
  employeeStore.clearErrors();
};
const clearForm = () => {
  newEmployee.value = {
    name: "",
    age: "",
    address: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
  };
  editingEmployee.value = null;
};

fetchEmployees();
</script>

<template>
  <section id="employeeform">
    <h2>Employee View</h2>
    <div v-if="employeeStore.error" class="errormessage">
      {{ employeeStore.error }}
    </div>
    <EmployeeForm
      v-if="!editingEmployee"
      :loading="employeeStore.loading"
      v-model:employee="newEmployee"
      v-model:validationErrors="employeeStore.validationErrors"
      form-label="Add: Employee"
      submit-label="Add Employee"
      reset-label="Reset"
      @submit="addEmployee"
      @reset="resetForm"
    />
    <EmployeeForm
      v-else
      :employeeStore.loading="employeeStore.loading"
      v-model:employee="editingEmployee"
      v-model:validationErrors="employeeStore.validationErrors"
      form-label="Edit: Employee"
      submit-label="Update Employee"
      reset-label="Cancel"
      @submit="updateEmployee"
      @reset="cancelEdit"
    />
  </section>
  <section id="employeetable">
    <h2>Employee List</h2>
    <div>
      <EmployeeTable
        :loading="employeeStore.loading"
        :employees="employeeStore.employees"
        @edit-click="editEmployee"
        @remove-click="deleteEmployee"
      />
    </div>
  </section>
</template>

<style scoped>
.errormessage {
  color: red;
}
</style>

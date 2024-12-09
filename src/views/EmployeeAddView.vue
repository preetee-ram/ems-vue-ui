<script setup>
import { ref } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";
import { useRouter } from "vue-router";
import EmployeeForm from "../components/EmployeeForm.vue";

const employeeStore = useEmployeeStore();
const router = useRouter();

const newEmployee = ref({
  name: "",
  age: "",
  address: "",
  department: "",
  designation: "",
  joiningDate: "",
  salary: "",
});

const addEmployee = async () => {
  await employeeStore.addEmployee(newEmployee.value);
  if (!employeeStore.hasError) {
    router.push("/");
  }
};

const resetForm = () => {
  newEmployee.value = {
    name: "",
    age: "",
    address: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
  };
  employeeStore.clearErrors();
};
</script>
<template>
  <section id="employee-add">
    <h2>Add Employee</h2>
    <div v-if="employeeStore.error" class="error-message">
      {{ employeeStore.error }}
    </div>
    <EmployeeForm
      :loading="employeeStore.loading"
      v-model:employee="newEmployee"
      v-model:validationErrors="employeeStore.validationErrors"
      form-label="Add: Employee"
      submit-label="Add Employee"
      reset-label="Reset"
      @submit="addEmployee"
      @reset="resetForm"
    />
  </section>
</template>
<style scoped>
.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>

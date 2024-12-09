<script setup>
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";
import { useRouter } from "vue-router";
import EmployeeForm from "../components/EmployeeForm.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const employeeStore = useEmployeeStore();
const router = useRouter();

const editingEmployee = ref(null);

const updateEmployee = async () => {
  await employeeStore.updateEmployee(editingEmployee.value);
  if (!employeeStore.hasError) {
    router.push("/");
  }
};

const cancelEdit = () => {
  router.push("/");
  employeeStore.clearErrors();
};

onMounted(async () => {
  const employee = employeeStore.employees.find(
    (e) => e.employeeId === props.id
  );
  if (employee) {
    editingEmployee.value = { ...employee };
  } else {
    // If employee not found, redirect to list
    router.push("/");
  }
});
</script>
<template>
  <section id="emp-edit">
    <h2>Edit Employee</h2>
    <div v-if="employeeStore.error" class="error-message">
      {{ employeeStore.error }}
    </div>
    <EmployeeForm
      v-if="editingEmployee"
      :loading="employeeStore.loading"
      v-model:employee="editingEmployee"
      v-model:validationErrors="employeeStore.validationErrors"
      form-label="Edit: Employee"
      submit-label="Update Employee"
      reset-label="Cancel"
      @submit="updateEmployee"
      @reset="cancelEdit"
    />
  </section>
</template>
<style scoped>
.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>

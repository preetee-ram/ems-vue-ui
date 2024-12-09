<script setup>
import InputWithError from "./InputWithError.vue";
import { computed } from "vue";

const employee = defineModel("employee");
const validationErrors = defineModel("validationErrors");
const props = defineProps([
  "loading",
  "formLabel",
  "submitLabel",
  "resetLabel",
]);
const emit = defineEmits(["submit", "reset"]);
const today = computed(() => new Date().toISOString().split("T")[0]);

const submitHandler = () => {
  emit("submit");
};
const resetHandler = () => {
  emit("reset");
};
</script>

<template>
  <form @submit.prevent="submitHandler">
    <fieldset class="grid">
      <legend>{{ formLabel }}</legend>
      <input
        type="text"
        name="empId"
        v-model="employee.employeeId"
        aria-label="Read-only input"
        readonly
      />
      <InputWithError
        inputId="Empname"
        v-model:task="employee.name"
        v-model:error="validationErrors.name"
        placeholder="Enter Name.."
      />

      <InputWithError
        inputId="Empage"
        v-model:task="employee.age"
        v-model:error="validationErrors.age"
        type="number"
        placeholder="Enter Age.."
        min="18"
        max="110"
      />
      <InputWithError
        inputId="Empaddress"
        v-model:task="employee.address"
        v-model:error="validationErrors.address"
        type="textarea"
        placeholder="Enter Address.."
      />
    </fieldset>
    <fieldset class="grid">
      <InputWithError
        inputId="Empdepartment"
        v-model:task="employee.department"
        v-model:error="validationErrors.department"
        placeholder="Enter Department.."
      />
      <InputWithError
        inputId="Empdesignation"
        v-model:task="employee.designation"
        v-model:error="validationErrors.designation"
        placeholder="Enter Designation.."
      />
      <InputWithError
        inputId="Joiningdate"
        v-model:task="employee.joiningDate"
        v-model:error="validationErrors.joiningDate"
        type="date"
        :max="today"
        placeholder="Enter Joining Date.."
      />
      <InputWithError
        inputId="Empsalary"
        v-model:task="employee.salary"
        v-model:error="validationErrors.salary"
        placeholder="Enter Salary.."
      />
    </fieldset>
    <fieldset class="grid">
      <button type="submit" :aria-busy="loading" :disabled="loading">
        {{ submitLabel }}
      </button>
      <button
        type="button"
        class="secondary"
        @click="resetHandler"
        :aria-busy="loading"
        :disabled="loading"
      >
        {{ resetLabel }}
      </button>
    </fieldset>
  </form>
</template>

<style scoped></style>

<script setup>
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "../stores/employeeStore";
import EmployeeTable from "../components/EmployeeTable.vue";
import { useRouter } from "vue-router";
import EmployeeCards from "@/components/EmployeeCards.vue";
import { useStorage } from "@vueuse/core";

const employeeStore = useEmployeeStore();
const router = useRouter();

const showCard = useStorage("emp-view-preference", "table");

const editEmployee = (id) => {
  router.push({ name: "EmployeeEdit", params: { id } });
};

const deleteEmployee = async (id) => {
  await employeeStore.deleteEmployee(id);
};

onMounted(async () => {
  await employeeStore.fetchEmployees();
});
</script>
<template>
  <section id="employee-list">
    <h2>Employee List</h2>
    <small>
      <p>
        <label
          >view as:<input
            type="radio"
            v-model="showCard"
            value="card"
          />cards<input
            type="radio"
            v-model="showCard"
            value="table"
          />table</label
        >
      </p>
    </small>
    <div v-if="employeeStore.error" class="error-message">
      {{ employeeStore.error }}
    </div>
    <EmployeeCards
      v-if="showCard === 'card'"
      :loading="employeeStore.loading"
      :employees="employeeStore.employees"
      @edit-click="editEmployee"
      @remove-click="deleteEmployee"
    />
    <EmployeeTable
      v-if="showCard === 'table'"
      :loading="employeeStore.loading"
      :employees="employeeStore.employees"
      @edit-click="editEmployee"
      @remove-click="deleteEmployee"
    />
  </section>
</template>
<style scoped>
.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>

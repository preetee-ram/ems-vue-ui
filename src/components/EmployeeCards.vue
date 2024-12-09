<script setup>
const props = defineProps(["employees", "loading"]);

const emit = defineEmits(["editClick", "removeClick"]);

const editHandler = (id) => {
  emit("editClick", id);
};
const deleteHandler = (id) => {
  emit("removeClick", id);
};
</script>

<template>
  <div v-if="employees && employees.length" class="container">
    <article
      v-for="employee in employees"
      :key="employee.employeeId"
      class="box"
    >
      <header>
        <h3>{{ employee.name }}</h3>
        <p><strong>ID:</strong> {{ employee.employeeId }}</p>
      </header>
      <p><strong>Department:</strong> {{ employee.department }}</p>
      <footer>
        <small><strong>Designation:</strong> {{ employee.designation }}</small>
        <p class="grid">
          <button
            :aria-busy="loading"
            :disabled="loading"
            class="icon-button1"
            @click="() => editHandler(employee.employeeId)"
            aria-label="Edit"
          >
            ✏️
          </button>
          <button
            :aria-busy="loading"
            :disabled="loading"
            class="icon-button1"
            @click="() => deleteHandler(employee.employeeId)"
            aria-label="Delete"
          >
            🗑️
          </button>
        </p>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.box {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-button1 {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}

.icon-button1:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-button1:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
}
</style>

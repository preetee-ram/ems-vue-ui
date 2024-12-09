<script setup>
const props = defineProps(["employees", "loading"]);
const emit = defineEmits(["editClick", "removeClick"]);
const editHandler = (empId) => {
  emit("editClick", empId);
};
const deleteHandler = (empId) => {
  emit("removeClick", empId);
};
</script>

<template>
  <table class="striped">
    <thead>
      <tr data-theme="dark">
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Address</th>
        <th scope="col">Department</th>
        <th scope="col">Designation</th>
        <th scope="col">Joining Date</th>
        <th scope="col">Salary</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="employee in employees" :key="employee.employeeId">
        <td>{{ employee.employeeId }}</td>
        <td>{{ employee.name }}</td>
        <td>{{ employee.age }}</td>
        <td>{{ employee.address }}</td>
        <td>{{ employee.department }}</td>
        <td>{{ employee.designation }}</td>
        <td>{{ employee.joiningDate }}</td>
        <td>{{ employee.salary }}</td>
        <td>
          <button
            :aria-busy="loading"
            :disabled="loading"
            @click="() => editHandler(employee.employeeId)"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            :aria-busy="loading"
            :disabled="loading"
            @click="() => deleteHandler(employee.employeeId)"
          >
            Delete
          </button>
        </td>
      </tr>
      <!-- <tr>
        <td>EmpId1</td>
        <td>Qwerty</td>
        <td>39</td>
        <td>Pune</td>
        <td>It</td>
        <td>ER</td>
        <td>2020-12-10</td>
        <td>230000</td>
        <td>
          <button class="primary">Edit</button>
          <button class="secondary">Delete</button>
        </td>
      </tr> -->
    </tbody>
    <tfoot>
      <tr></tr>
    </tfoot>
  </table>
</template>
<style scoped>
/* tr {
  max-width: fit-content;
  margin: 0;
  padding: 0;
}
td {
  margin: 0;
  padding: 0;
} */
th {
  background-color: rgb(50, 24, 86);
}
/* button {
  margin-left: 5px;
} */
</style>

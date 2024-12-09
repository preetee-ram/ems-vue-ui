<script setup>
import EmployeeHeader from "./EmployeeHeader.vue";
import EmployeeFooter from "./EmployeeFooter.vue";
</script>
<template>
  <EmployeeHeader />
  <main class="container">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
  <EmployeeFooter />
</template>
<style scoped></style>

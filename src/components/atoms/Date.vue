<template>
  <time>{{ dateString }}</time>
</template>

<script setup>
import { ref } from "vue";

const dateString = ref("");

const setCurrentDate = () => {
  var date = new Date();
  var dateOptions = { timeZone: "Europe/Paris" };
  var dateFormatter = new Intl.DateTimeFormat([], dateOptions);
  dateString.value = dateFormatter.format(date);
};

setInterval(setCurrentDate, 1000);
</script>

<style lang="scss" scoped></style>

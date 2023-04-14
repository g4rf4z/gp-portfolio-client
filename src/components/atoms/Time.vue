<template>
  <time>{{ timeString }}</time>
</template>

<script setup>
import { ref } from "vue";

const timeString = ref("");

const setCurrentTime = () => {
  var time = new Date();
  var timeOptions = {
    timeZone: "Europe/Paris",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  var timeFormatter = new Intl.DateTimeFormat([], timeOptions);
  timeString.value = timeFormatter.format(time);
};

setInterval(setCurrentTime, 1000);
</script>

<style lang="scss" scoped></style>

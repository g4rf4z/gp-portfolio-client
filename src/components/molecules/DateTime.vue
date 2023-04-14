<template>
  <div class="date-time">
    <h3 class="date">
      Nous sommes le
      <date-atom></date-atom> et il est actuellement <time-atom></time-atom>.
    </h3>
  </div>
</template>

<script setup>
import DateAtom from "#/atoms/Date.vue";
import TimeAtom from "#/atoms/Time.vue";
</script>

<style lang="scss" scoped>
.date-time {
  @apply mb-10;

  h3 {
    @apply font-mono text-teal-200;
  }
}
</style>

<template>
  <button
    :class="{ 'menu-burger': true, 'is-toggled': isToggled }"
    aria-label="Ouvrir ou fermer le menu de navigation"
    @click="handleClick"
  >
    <div class="ham-box">
      <div class="ham-box-inner"></div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  isToggled: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);
const handleClick = (event) => {
  emit("click", event);
};
</script>

<style lang="scss" scoped>
.menu-burger {
  @apply flex items-center justify-center z-50;
}

.ham-box {
  @apply h-10 w-10 inline-block relative;
  @apply lg:hidden;
}

.ham-box-inner {
  width: 30px;
  height: 2px;
  @apply absolute top-1/2 right-0 rounded bg-teal-200 duration-300;
}

.is-toggled .ham-box-inner {
  transition-delay: 0.15s;
  transform: rotate(225deg);
}

.ham-box-inner:before,
.ham-box-inner:after {
  height: 2px;
  width: 30px;
  content: "";
  @apply block absolute left-auto right-0 ease-in-out rounded bg-teal-200 duration-300;
}

.ham-box-inner:before {
  width: 125%;
  top: -12px;
  opacity: 1;
}

.is-toggled .ham-box-inner:before {
  width: 100%;
  top: 0;
  opacity: 0;
}

.ham-box-inner:after {
  width: 75%;
  bottom: -12px;
  transform: rotate(0);
}

.is-toggled .ham-box-inner:after {
  width: 100%;
  bottom: 0;
  transform: rotate(-90deg);
}
</style>

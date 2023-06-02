import { ref, computed } from 'vue';

export const usePagination = (data, pageSize) => {
  const page = ref(1);
  const dataLoaded = ref(false);

  const paginatedData = computed(() => {
    return data.value.slice(0, page.value * pageSize);
  });

  const displayMoreData = () => {
    if (page.value * pageSize < data.value.length) {
      page.value++;
      if (page.value * pageSize >= data.value.length) {
        dataLoaded.value = true;
      }
    }
  };

  const displayLessData = () => {
    if (page.value > 1) {
      page.value--;
    }
    if (page.value <= 1) {
      dataLoaded.value = false;
    }
  };

  return {
    paginatedData,
    displayMoreData,
    displayLessData,
    dataLoaded,
  };
};

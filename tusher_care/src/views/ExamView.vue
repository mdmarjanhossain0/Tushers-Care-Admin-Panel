<template>
  <div>
    <SideBarComponent />
    <ExamComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import ExamComponent from "@/components/ExamComponent.vue";

export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    ExamComponent,
  },
};
</script>

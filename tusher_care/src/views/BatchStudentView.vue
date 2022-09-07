<template>
  <div>
    <SideBarComponent />
    <BatchStudentComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import BatchStudentComponent from "@/components/BatchStudentComponent.vue";

export default {
  name: "BatchStudentView",
  components: {
    SideBarComponent,
    BatchStudentComponent,
  },
};
</script>

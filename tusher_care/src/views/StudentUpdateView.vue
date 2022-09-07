<template>
  <div>
    <SideBarComponent />

    <StudentUpdateComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import StudentUpdateComponent from "@/components/StudentUpdateComponent.vue";

export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    StudentUpdateComponent,
  },
};
</script>

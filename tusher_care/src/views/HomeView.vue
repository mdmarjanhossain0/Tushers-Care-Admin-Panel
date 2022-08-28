<template>
  <div>
    <SideBarComponent />
    <StudentComponent />
  </div>
</template>

<script>
import StudentComponent from "@/components/StudentComponent.vue";
import SideBarComponent from "@/components/SideBarComponent.vue";

export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    StudentComponent,
  },
};
</script>

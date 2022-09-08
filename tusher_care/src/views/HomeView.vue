<template>
  <div>
    <SideBarComponent />
    <StudentComponent />
    <!-- <LogInComponents /> -->
  </div>
</template>

<script>
import StudentComponent from "@/components/StudentComponent.vue";
import SideBarComponent from "@/components/SideBarComponent.vue";
// import LogInComponents from "@/components/LogInComponent2.vue";
export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    StudentComponent,
    // LogInComponents,
  },
};
</script>

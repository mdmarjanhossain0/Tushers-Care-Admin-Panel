<template>
  <div>
    <SideBarComponent />
    <TeacherComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";

import TeacherComponent from "@/components/TeacherComponent.vue";

export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    TeacherComponent,
  },
};
</script>

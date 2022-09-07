<template>
  <div>
    <SideBarComponent />
    <CourseComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import CourseComponent from "@/components/CourseComponent.vue";

export default {
  name: "CourseView",
  components: {
    SideBarComponent,
    CourseComponent,
  },
};
</script>

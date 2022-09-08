<template>
  <div>
    <SideBarComponent />
    <TeacherUpdateComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import TeacherUpdateComponent from "@/components/TeacherUpdateComponent.vue";

export default {
  name: "TeacherUpdateView",
  components: {
    SideBarComponent,
    TeacherUpdateComponent,
  },
};
</script>

<template>
  <div>
    <SideBarComponent />
    <TeacherComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";

import TeacherComponent from "@/components/TeacherComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "TeacherView",
  components: {
    SideBarComponent,
    TeacherComponent,
    LoadingComponent,
  },
};
</script>

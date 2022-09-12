<template>
  <div>
    <SideBarComponent />
    <CourseComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import CourseComponent from "@/components/CourseComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "CourseView",
  components: {
    SideBarComponent,
    CourseComponent,
    LoadingComponent,
  },
};
</script>

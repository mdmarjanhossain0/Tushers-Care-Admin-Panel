<template>
  <div>
    <SideBarComponent />

    <StudentUpdateComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import StudentUpdateComponent from "@/components/StudentUpdateComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "HomeView",
  components: {
    SideBarComponent,
    StudentUpdateComponent,
    LoadingComponent,
  },
};
</script>

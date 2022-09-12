<template>
  <div>
    <SideBarComponent />
    <ExamComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import ExamComponent from "@/components/ExamComponent.vue";
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
    ExamComponent,
    LoadingComponent,
  },
};
</script>

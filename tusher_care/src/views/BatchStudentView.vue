<template>
  <div>
    <SideBarComponent />
    <BatchStudentComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import BatchStudentComponent from "@/components/BatchStudentComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "BatchStudentView",
  components: {
    SideBarComponent,
    BatchStudentComponent,
    LoadingComponent,
  },
};
</script>

<template>
  <div>
    <SideBarComponent />

    <ReportComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import ReportComponent from "@/components/ReportComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "ReportView",
  components: {
    SideBarComponent,
    ReportComponent,
    LoadingComponent,
  },
};
</script>

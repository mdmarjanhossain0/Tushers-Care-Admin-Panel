<template>
  <div>
    <SideBarComponent />

    <ReportComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import ReportComponent from "@/components/ReportComponent.vue";

export default {
  name: "ReportView",
  components: {
    SideBarComponent,
    ReportComponent,
  },
};
</script>

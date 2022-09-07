<template>
  <div>
    <SideBarComponent />
    <StaffComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import StaffComponent from "@/components/StaffComponent.vue";

export default {
  name: "StaffView",
  components: {
    SideBarComponent,
    StaffComponent,
  },
};
</script>

<template>
  <div>
    <SideBarComponent />
    <StaffUpdateComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import StaffUpdateComponent from "@/components/StaffUpdateComponent.vue";

export default {
  name: "StaffUpdateView",
  components: {
    SideBarComponent,
    StaffUpdateComponent,
  },
};
</script>

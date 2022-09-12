<template>
  <div>
    <SideBarComponent />
    <StaffUpdateComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import StaffUpdateComponent from "@/components/StaffUpdateComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "StaffUpdateView",
  components: {
    SideBarComponent,
    StaffUpdateComponent,
    LoadingComponent,
  },
};
</script>

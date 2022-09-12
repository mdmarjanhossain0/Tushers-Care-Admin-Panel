<template>
  <div>
    <SideBarComponent />
    <StaffComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import StaffComponent from "@/components/StaffComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "StaffView",
  components: {
    SideBarComponent,
    StaffComponent,
    LoadingComponent,
  },
};
</script>

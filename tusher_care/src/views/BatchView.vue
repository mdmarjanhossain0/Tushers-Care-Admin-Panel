<template>
  <div>
    <SideBarComponent />
    <BatchComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import BatchComponent from "@/components/BatchComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "BatchView",
  components: {
    SideBarComponent,
    BatchComponent,
    LoadingComponent,
  },
};
</script>

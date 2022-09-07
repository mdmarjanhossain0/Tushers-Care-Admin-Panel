<template>
  <div>
    <SideBarComponent />
    <BatchComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import BatchComponent from "@/components/BatchComponent.vue";

export default {
  name: "BatchView",
  components: {
    SideBarComponent,
    BatchComponent,
  },
};
</script>

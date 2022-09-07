<template>
  <div>
    <SideBarComponent />

    <PaymentComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import PaymentComponent from "@/components/PaymentComponent.vue";

export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    PaymentComponent,
  },
};
</script>

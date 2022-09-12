<template>
  <div>
    <SideBarComponent />

    <PaymentComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import PaymentComponent from "@/components/PaymentComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "HomeView",
  components: {
    SideBarComponent,
    PaymentComponent,
    LoadingComponent,
  },
};
</script>

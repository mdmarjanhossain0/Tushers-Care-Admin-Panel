<template>
  <div>
    <div v-if="token">
      <SideBarComponent />
      <StudentComponent />
    </div>
    <LogInComponents v-else />

    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import StudentComponent from "@/components/StudentComponent.vue";
import SideBarComponent from "@/components/SideBarComponent.vue";
import LogInComponents from "@/components/LogComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  name: "HomeView",
  components: {
    SideBarComponent,
    StudentComponent,
    LogInComponents,
    LoadingComponent,
  },

  computed: {
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return true;
      } else {
        return false;
      }
    },
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
};
</script>

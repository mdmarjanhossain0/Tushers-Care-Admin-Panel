<template>
  <div>
    <SideBarComponent />
    <NoticeComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import NoticeComponent from "@/components/NoticeComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "NoticeView",
  components: {
    SideBarComponent,
    NoticeComponent,
    LoadingComponent,
  },
};
</script>

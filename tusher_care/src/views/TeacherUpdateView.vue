<template>
  <div>
    <SideBarComponent />
    <TeacherUpdateComponent />
    <LoadingComponent v-if="is_loading" />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import TeacherUpdateComponent from "@/components/TeacherUpdateComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    },
  },
  name: "TeacherUpdateView",
  components: {
    SideBarComponent,
    TeacherUpdateComponent,
    LoadingComponent,
  },
};
</script>

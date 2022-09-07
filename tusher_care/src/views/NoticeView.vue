<template>
  <div>
    <SideBarComponent />
    <NoticeComponent />
  </div>
</template>

<script>
import SideBarComponent from "@/components/SideBarComponent.vue";
import NoticeComponent from "@/components/NoticeComponent.vue";

export default {
  name: "NoticeView",
  components: {
    SideBarComponent,
    NoticeComponent,
  },
};
</script>

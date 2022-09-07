<template>
  <div class="sidebar" id="sidebar">
    <div class="logo">
      <i class="fa-brands fa-atlassian"></i>
      <h3><span>Tusher's Care</span></h3>
    </div>

    <div class="sidebar-menu">
      <a href="#" class="dashboard active"
        ><i class="fa-solid fa-graduation-cap"></i> <span>Student</span></a
      >
      <a href="#" class="customer"
        ><i class="fa-sharp fa-solid fa-people-group"></i> <span>Batch</span></a
      >
      <a href="#" class="advertisement"
        ><i class="fa-solid fa-basket-shopping"></i> <span>Advertise</span></a
      >
      <a href="#" class="dashboard"
        ><i class="fa-brands fa-bitcoin"></i> <span>Monetize</span></a
      >
      <a href="#" class="dashboard"
        ><i class="fa-solid fa-trophy"></i> <span>Score</span></a
      >
    </div>
  </div>
</template>








<script>
export default {
  data() {
    return {};
  },
  methods: {
    select_side_bar(abc) {},
  },
  computed: {
    tab() {
      return this.$store.state.side_bar_selected_tab;
    },
  },
};
</script>
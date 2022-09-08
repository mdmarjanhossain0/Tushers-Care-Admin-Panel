<template>
  <div class="sidebar" id="sidebar">
    <div class="logo">
      <!-- <i class="fa-brands fa-atlassian"></i> -->
      <h3><span>Tusher's Care</span></h3>
    </div>

    <div class="sidebar-menu">
      <a
        href="#"
        class="dashboard"
        :class="[tab === '/' ? 'active' : '']"
        @click="navigate_home"
        ><i class="fa-solid fa-graduation-cap"></i> <span>Student</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/batch' ? 'active' : '']"
        @click="navigate_batch"
        ><i class="fa-sharp fa-solid fa-people-group"></i>
        <span> Batch</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/course' ? 'active' : '']"
        @click="navigate_course"
        ><i class="fa-solid fa-book"></i><span> Course</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/exam' ? 'active' : '']"
        @click="navigate_exam"
        ><i class="fa-sharp fa-solid fa-pen-to-square"></i>
        <span> Exam</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/payment' ? 'active' : '']"
        @click="navigate_payment"
        ><i class="fa-sharp fa-solid fa-basket-shopping"></i>
        <span> Payment</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/notice' ? 'active' : '']"
        @click="navigate_notice"
        ><i class="fa-solid fa-triangle-exclamation"></i> <span>Notice</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/teacher' ? 'active' : '']"
        @click="navigate_teacher"
        ><i class="fa-solid fa-user"></i> <span>Teacher</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/staff' ? 'active' : '']"
        @click="navigate_staff"
        ><i class="fa-solid fa-user-check"></i> <span>Staff</span></a
      >

      <a
        href="#"
        class="dashboard"
        :class="[tab === '/report' ? 'active' : '']"
        @click="navigate_report"
        ><i class="fa-solid fa-calendar-days"></i> <span>Report</span></a
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
    navigate_home() {
      this.$router.push({
        path: "/",
      });
    },
    navigate_batch() {
      this.$router.push({
        path: "/batch",
      });
    },
    navigate_course() {
      this.$router.push({
        path: "/course",
      });
    },
    navigate_exam() {
      this.$router.push({
        path: "/exam",
      });
    },
    navigate_payment() {
      this.$router.push({
        path: "/payment",
      });
    },
    navigate_notice() {
      this.$router.push({
        path: "/notice",
      });
    },
    navigate_teacher() {
      this.$router.push({
        path: "/teacher",
      });
    },
    navigate_staff() {
      this.$router.push({
        path: "/staff",
      });
    },
    navigate_report() {
      this.$router.push({
        path: "/report",
      });
    },
  },

  mounted() {
    console.log(this.$route.path);
  },
  computed: {
    tab() {
      return this.$route.path;
    },
  },
};
</script>
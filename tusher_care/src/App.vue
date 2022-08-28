<template>
  <router-view />
</template>
<!-- <style src='./assets/css/parent.css'></style> -->

<script>
import axios from "axios";
export default {
  data() {
    return {
      total_data: 0,
    };
  },
  methods: {},
  created() {
    // this.get_offers(1);
    // this.get_account_history();
  },
};
</script>
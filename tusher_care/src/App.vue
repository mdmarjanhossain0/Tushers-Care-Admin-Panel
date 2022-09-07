<template>
  <router-view />
</template>
<!-- <style src='./assets/css/parents.css'></style> -->
<style src="./assets/css/parents.css"></style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total_data: 0,
    };
  },
  methods: {
    get_batchs() {
      // var token = localStorage.getItem("token");
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = "http://localhost:8000/api/account/batch";
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_batch", response.data.results);
        })
        .catch((error) => {})
        .finally(() => this.$store.commit("update_is_loading", false));
    },
    get_course() {
      // var token = localStorage.getItem("token");
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `http://localhost:8000/api/academic/course`;
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_course", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.previous_query = this.query;
        });
    },
  },
  created() {
    // this.get_offers(1);
    // this.get_account_history();
    this.get_batchs();
    this.get_course();
  },
};
</script>
<template>
  <div class="main-content" id="main-content">
    <header id="navbar">
      <div class="title">
        <input type="checkbox" id="side-menu-bar" />
        <label for="side-menu-bar" class="fas fa-bars"></label>
        <a href="#" class="logo">Students And Batch</a>
      </div>

      <nav class="navbar">
        <div class="details">
          <img src="../assets/blog-1.jpg" width="30px" height="30px" alt="" />
          <div>
            <h4>Marjan</h4>
            <small>Super user</small>
          </div>
        </div>
      </nav>
    </header>

    <div class="content-area">
      <div class="student">
        <div class="student-list">
          <div class="search-card">
            <div class="filters">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <label for="start-date"> Start </label>
                <input
                  type="date"
                  id="start-date"
                  style="margin: 0.5rem"
                  v-model="start"
                />
              </div>
              <h1 style="font-weight: bolder">Report Filters</h1>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <label for="end-date"> End </label>
                <input
                  type="date"
                  id="end-date"
                  style="margin: 0.5rem"
                  v-model="end"
                />
              </div>
            </div>
            <div class="filters">
              <p
                :class="[selected_filter === 'All' ? 'selected-filter' : '']"
                @click="select_filter('All')"
              >
                All
              </p>
              <p
                :class="[
                  selected_filter === 'Student Payment'
                    ? 'selected-filter'
                    : '',
                ]"
                @click="select_filter('Student Payment')"
              >
                Student
              </p>
              <p
                :class="[
                  selected_filter === 'Teacher Payment'
                    ? 'selected-filter'
                    : '',
                ]"
                @click="select_filter('Teacher Payment')"
              >
                Teacher
              </p>
              <p
                :class="[
                  selected_filter === 'Staff Payment' ? 'selected-filter' : '',
                ]"
                @click="select_filter('Staff Payment')"
              >
                Staff
              </p>
              <p
                :class="[selected_filter === 'Other' ? 'selected-filter' : '']"
                @click="select_filter('Other')"
              >
                Other
              </p>
            </div>
          </div>
          <div class="list">
            <div
              class="student-card"
              v-for="(item, index) in reports"
              :key="index"
              @click="navigate_update(item.pk)"
            >
              <div class="image">
                <img :src="item.profile_picture" alt="" />
              </div>
              <div class="content">
                <h3>Payment Type : {{ item.type }}</h3>
                <p>Name : {{ item.username }}</p>
                <p>Amount : {{ item.fee }}</p>
                <p>Fine : {{ item.fine }}</p>
                <p>Discount : {{ item.discount }}</p>
                <p>Note : {{ item.note }}</p>
                <p>Date : {{ item.created_at }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selected_filter: "All",
      query: "",
      previous_query: "a",
      api_calling: false,
      start: "",
      end: "",
    };
  },
  methods: {
    get_reports() {
      this.api_calling = true;
      // var token = localStorage.getItem("token");
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `http://localhost:8000/api/payment/student?query=${this.selected_filter}&start=${this.start}&end=${this.end}`;
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_report", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.api_calling = false;
          this.previous_query = this.query;
        });
    },
    open_batchs() {
      document.getElementById("student-batch-list-dialog").style.display =
        "block";
    },

    close_batchs() {
      document.getElementById("student-batch-list-dialog").style.display =
        "none";
    },
    select_batch(item) {
      this.selected_batch = item;

      this.discount = item.discount;
      this.close_batchs();
    },

    navigate_update(pk) {},

    select_filter(abc) {
      this.selected_filter = abc;
      this.get_reports();
    },

    onEnter() {
      console.log("on enter button");

      this.get_staffs();
    },
  },

  mounted() {
    var checkbox = document.getElementById("side-menu-bar");
    var sidebar = document.getElementById("sidebar");
    var maincontent = document.getElementById("main-content");

    checkbox.addEventListener("change", function () {
      if (this.checked) {
        sidebar.classList.add("collaps-side-bar");
        maincontent.classList.add("collaps-main-content");
        console.log("Checkbox is checked..");
      } else {
        sidebar.classList.remove("collaps-side-bar");
        maincontent.classList.remove("collaps-main-content");
        console.log("Checkbox is not checked..");
      }
    });

    this.get_reports();
  },
  computed: {
    // token() {
    //   var t = localStorage.getItem("token");
    //   if (t) {
    //     this.$router.push("/profile");
    //   }
    //   return "";
    // },
    reports() {
      return this.$store.state.reports;
    },
  },
  watch: {
    start() {
      this.get_reports();
    },
    end() {
      this.get_reports();
    },
  },
};
</script>
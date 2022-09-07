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
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="Search Student"
                v-model="query"
                v-on:keyup.enter="onEnter"
              />
              <button class="searchButton" @click="onEnter">
                <i class="fa fa-search"></i>
              </button>
            </div>
            <div class="filters">
              <p
                :class="[
                  selected_filter === 'username' ? 'selected-filter' : '',
                ]"
                @click="select_filter('username')"
              >
                Name
              </p>
              <p
                :class="[selected_filter === 'mobile' ? 'selected-filter' : '']"
                @click="select_filter('mobile')"
              >
                Mobile
              </p>
              <p
                :class="[selected_filter === 'pk' ? 'selected-filter' : '']"
                @click="select_filter('pk')"
              >
                Student Id
              </p>
            </div>
          </div>
          <div class="list">
            <div
              class="student-card"
              v-for="(item, index) in students"
              :key="index"
              @click="navigate_update(item.pk)"
            >
              <div class="image">
                <img :src="item.profile_picture" alt="" />
              </div>
              <div class="content">
                <h3>Name : {{ item.username }}</h3>
                <p>Mobile : {{ item.mobile }}</p>
                <p>Email : {{ item.email }}</p>
                <p>Batch : {{ item.batch_name }}</p>
                <p>Group : {{ item.group }}</p>
                <p>Balance : {{ item.balance }}</p>
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
      selected_filter: "username",
      query: "",
      previous_query: "a",
      api_calling: false,
    };
  },
  methods: {
    get_students(batch) {
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
      var url = `http://localhost:8000/api/account/student?batch=${batch}`;
      if (this.selected_filter == "username") {
        url = `http://localhost:8000/api/account/student?batch=${batch}&username=${this.query}`;
      } else if (this.selected_filter == "mobile") {
        url = `http://localhost:8000/api/account/student?batch=${batch}&mobile=${this.query}`;
      } else {
        url = `http://localhost:8000/api/account/student?batch=${batch}&pk=${this.query}`;
      }
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_student", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.api_calling = false;
          this.previous_query = this.query;
        });
    },

    navigate_update(pk) {
      this.$router.push({ path: `/student/${pk}` });
    },

    select_filter(abc) {
      this.selected_filter = abc;
    },

    onEnter() {
      console.log("on enter button");
      this.get_students(this.$route.params.pk);
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
    this.get_students(this.$route.params.pk);
  },
  computed: {
    // token() {
    //   var t = localStorage.getItem("token");
    //   if (t) {
    //     this.$router.push("/profile");
    //   }
    //   return "";
    // },
    students() {
      return this.$store.state.students;
    },
  },
  watch: {},
};
</script>
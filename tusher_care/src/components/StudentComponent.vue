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
        <div class="add-student-header">
          <h3>Batch Name</h3>
          <i class="fa-solid fa-circle-chevron-down"></i>
        </div>

        <div class="student-list">
          <div class="search-card">
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="Search Student"
              />
              <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
              </button>
            </div>
            <div class="filters">
              <p>Name</p>
              <p>Mobile</p>
              <p>Student Id</p>
            </div>
          </div>
          <div class="list">
            <div class="student-card" v-for="item in students">
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

        <div class="student-form">
          <h2>Add Student</h2>
          <div class="form-field">
            <div
              style="
                margin-bottom: 1rem;
                margin-left: 1.1rem;
                position: relative;
                display: flex;
              "
            >
              <label for="inputTag">
                <i class="fa fa-2x fa-camera"></i>
                <input id="inputTag" style="display: none" type="file" />
                <br />
                <span id="imageName"></span>
              </label>
            </div>
            <input
              type="text"
              class="student-property"
              placeholder="Student Name"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Phone Number"
            />
            <input type="text" class="student-property" placeholder="Email" />
            <!-- <div class="select">
                            <p>Select Batch</p>
                            <i class="fa-solid fa-square-chevron-down"></i>
                        </div> -->
            <p class="box-border-p">-----Select Batch------</p>
            <input
              type="text"
              class="student-property"
              placeholder="Coaching Group"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Parent's Phone Number"
            />
            <input
              type="text"
              class="student-property"
              placeholder="HSC/SSC/Equvalent Registration Number"
            />
            <div class="dropdown">
              <span>-----Select HSC Group------</span>
              <div class="dropdown-content">
                <p>Science</p>
                <p>Arts</p>
                <p>Commerce</p>
              </div>
            </div>
            <input
              type="text"
              class="student-property"
              placeholder="HSC Year"
            />
            <input
              type="text"
              class="student-property"
              placeholder="HSC Roll"
            />
            <input type="text" class="student-property" placeholder="HSC GPA" />
            <div class="dropdown">
              <span>-----Select HSC Group------</span>
              <div class="dropdown-content">
                <p>Science</p>
                <p>Arts</p>
                <p>Commerce</p>
              </div>
            </div>
            <input
              type="text"
              class="student-property"
              placeholder="SSC Year"
            />
            <input
              type="text"
              class="student-property"
              placeholder="SSC Roll"
            />
            <input type="text" class="student-property" placeholder="SSC GPA" />
            <input type="text" class="student-property" placeholder="Address" />

            <button>Create</button>
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
      mobile: "",
      password: "",
      test: ["a", "b", "c"],
    };
  },
  methods: {
    get_students() {
      // var token = localStorage.getItem("token");
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = "https://tushers-care.com/api/account/student";
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_student", response.data.results);
        })
        .catch((error) => {})
        .finally(() => this.$store.commit("update_is_loading", false));
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
    this.get_students();
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
      console.log(this.$store.state.students);
      return this.$store.state.students;
    },
  },
};
</script>
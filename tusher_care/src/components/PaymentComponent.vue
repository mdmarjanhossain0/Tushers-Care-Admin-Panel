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
      <div class="payment">
        <div class="student-form">
          <h2>Payment</h2>
          <div class="form-field">
            <div class="dropdown">
              <span>-----Select HSC Group------</span>
              <div class="dropdown-content">
                <p>Science</p>
                <p>Arts</p>
                <p>Commerce</p>
              </div>
            </div>
            <p class="box-border-p">-----Select Batch------</p>
            <p>Name</p>
            <p>Amount</p>
            <input
              type="number"
              class="student-property"
              placeholder="Amount"
            />
            <input type="text" class="student-property" placeholder="Fee" />
            <input
              type="text"
              class="student-property"
              placeholder="Discount"
            />
            <input type="text" class="student-property" placeholder="Note" />
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
      course_name: "",
      description: "",
      course_name_status: "",
    };
  },
  methods: {
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
    create_course() {
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      const params = new URLSearchParams();

      if (this.course_name != null && this.course_name != "") {
        params.append("name", this.course_name);
        this.course_name_status = "";
      } else {
        this.course_name_status = "Required field";
        return;
      }

      if (this.description != null && this.description != "") {
        params.append("description", this.description);
        this.description_status = "";
      } else {
        this.description_status = "Required field";
        return;
      }
      var url = "http://localhost:8000/api/academic/course/create";
      axios
        .post(url, params, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },

    navigate_update(pk) {
      this.$router.push({ path: `/student/${pk}` });
    },

    onEnter() {},
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
    this.get_course();
  },
  computed: {
    // token() {
    //   var t = localStorage.getItem("token");
    //   if (t) {
    //     this.$router.push("/profile");
    //   }
    //   return "";
    // },
    courses() {
      return this.$store.state.courses;
    },
  },
  watch: {},
};
</script>
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
          <h3>Student Form</h3>
          <label for="add" class="fas fa-bars">
            <input type="checkbox" name="df" id="add" />
          </label>
        </div>

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
              v-for="(item, index) in staffs"
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
                <p>Balance : {{ item.balance }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="student-form" style="height: auto !important">
          <h2>Staff Form</h2>
          <div class="form-field" id="form">
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
              placeholder="Staff Name"
              v-model="staff_name"
            />
            <span style="color: red">{{ staff_name_status }}</span>
            <input
              type="text"
              class="student-property"
              placeholder="Phone Number"
              v-model="mobile"
            />
            <span style="color: red">{{ mobile_status }}</span>
            <input
              type="text"
              class="student-property"
              placeholder="Email"
              v-model="email"
            />
            <span style="color: red">{{ email_status }}</span>
            <input
              type="text"
              class="student-property"
              placeholder="Address"
              v-model="address"
            />

            <button @click="create_staff">Create</button>
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
      staff_name: "",
      mobile: "",
      email: "",
      address: "",
      selected_filter: "username",
      query: "",
      previous_query: "a",
      api_calling: false,

      staff_name_status: "",
      mobile_status: "",
      email_status: "",
    };
  },
  methods: {
    get_staffs() {
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
      var url = `http://localhost:8000/api/account/staff`;
      if (this.selected_filter == "username") {
        url = `http://localhost:8000/api/account/staff?username=${this.query}`;
      } else if (this.selected_filter == "mobile") {
        url = `http://localhost:8000/api/account/staff?mobile=${this.query}`;
      } else {
        url = `http://localhost:8000/api/account/staff?pk=${this.query}`;
      }
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_staff", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.api_calling = false;
          this.previous_query = this.query;
        });
    },

    create_staff() {
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
      };
      const params = new FormData();
      var file = document.getElementById("inputTag");
      if (file.files[0]) {
        params.append("profile_picture", file.files[0]);
      }
      if (this.staff_name != null && this.staff_name != "") {
        params.append("username", this.staff_name);
        this.staff_name_status = "";
      } else {
        this.staff_name_status = "Required field";
        return;
      }

      if (this.mobile != null && this.mobile != "") {
        params.append("mobile", this.mobile);
        this.mobile_status = "";
      } else {
        this.mobile_status = "Required field";
        return;
      }

      if (this.email != null && this.email != "") {
        params.append("email", this.email);
        this.email_status = "";
      } else {
        this.email_status = "Required field";
        return;
      }

      params.append("address", this.address);

      params.append("password", this.mobile);
      params.append("password2", this.mobile);
      var url = "http://localhost:8000/api/account/register/staff";
      axios
        .post(url, params, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("dslkfj");
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

    navigate_update(pk) {
      this.$router.push({ path: `/student/${pk}` });
    },

    select_filter(abc) {
      this.selected_filter = abc;
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

    // var checkbox = document.getElementById("add");
    // checkbox.addEventListener("change", function () {
    //   if (this.checked) {
    //     document.getElementsByClassName("student-form").style.display = "none";
    //   } else {
    //     console.log("Checkbox is not checked..");
    //   }
    // });

    this.get_staffs();
  },
  computed: {
    // token() {
    //   var t = localStorage.getItem("token");
    //   if (t) {
    //     this.$router.push("/profile");
    //   }
    //   return "";
    // },
    staffs() {
      console.log("data of All " + this.$store.state.staffs);
      return this.$store.state.staffs;
    },
  },
  watch: {},
};
</script>
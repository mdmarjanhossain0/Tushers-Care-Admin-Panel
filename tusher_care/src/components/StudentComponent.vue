<template>
  <div class="main-content" id="main-content">
    <div class="list-dialog-blur" id="student-batch-list-dialog">
      <div class="list-dialog">
        <i class="fa-solid fa-circle-xmark close" @click="close_batchs"></i>
        <h1>Batch List</h1>
        <div class="list">
          <div
            class="batch-card"
            v-for="(item, index) in batchs"
            :key="index"
            @click="select_batch(item)"
          >
            <div class="header">
              <h3>{{ item.name }}</h3>
              <p>T{{ item.title }}</p>
            </div>
            <div>
              <p>Fee : {{ item.fee }}</p>
              <p>Discount : {{ item.discount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="full-screen-dialog-blur" id="student-form-dialog">
      <div class="full-screen-dialog">
        <i
          class="fa-solid fa-circle-xmark close"
          @click="close_student_form_dialog"
        ></i>
        <div class="student-form">
          <h2>Student Form</h2>
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
              placeholder="Student Name"
              v-model="student_name"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Phone Number"
              v-model="mobile"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Email"
              v-model="email"
            />

            <div
              style="
                border: 1px solid black;
                box-shadow: 1px 3px 3px 1px var(--primary);
                margin: 1rem;
              "
            >
              <p class="box-border-p" @click="open_batchs">
                {{ selected_batch_name }}
              </p>

              <p class="box-border-p">Fee : {{ get_batch_fee }}</p>

              <div style="display: flex">
                <label for="discount">Discount</label>
                <input
                  type="text"
                  class="student-property"
                  placeholder="Discount"
                  id="discount"
                  v-model="discount"
                />
              </div>
            </div>
            <input
              type="text"
              class="student-property"
              placeholder="Coaching Group"
              v-model="coachin_group"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Parent's Phone Number"
              v-model="parent_mobile"
            />
            <input
              type="number"
              class="student-property"
              placeholder="HSC/SSC/Equvalent Registration Number"
              v-model="registration_number"
            />
            <div class="dropdown">
              <span>{{ selected_hsc_group_name }}</span>
              <div class="dropdown-content" id="student-hsc-drop-down">
                <p @click="select_hsc_group('Science')">Science</p>
                <p @click="select_hsc_group('Arts')">Arts</p>
                <p @click="select_hsc_group('Commerce')">Commerce</p>
              </div>
            </div>
            <input
              type="number"
              class="student-property"
              placeholder="HSC Year"
              v-model="hsc_year"
            />
            <input
              type="number"
              class="student-property"
              placeholder="HSC Roll"
              v-model="hsc_roll"
            />
            <input
              type="number"
              class="student-property"
              placeholder="HSC GPA"
              v-model="hsc_gpa"
            />
            <div class="dropdown">
              <span>{{ selected_ssc_group_name }}</span>
              <div class="dropdown-content">
                <p @click="select_ssc_group('Science')">Science</p>
                <p @click="select_ssc_group('Arts')">Arts</p>
                <p @click="select_ssc_group('Commerce')">Commerce</p>
              </div>
            </div>
            <input
              type="number"
              class="student-property"
              placeholder="SSC Year"
              v-model="ssc_year"
            />
            <input
              type="number"
              class="student-property"
              placeholder="SSC Roll"
              v-model="ssc_roll"
            />
            <input
              type="number"
              class="student-property"
              placeholder="SSC GPA"
              v-model="ssc_gpa"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Address"
              v-model="address"
            />

            <button @click="create_student">Create</button>
          </div>
        </div>
      </div>
    </div>

    <header id="navbar">
      <div class="title">
        <input type="checkbox" id="side-menu-bar" />
        <label for="side-menu-bar" class="fas fa-bars"></label>
        <a href="#" class="logo">Students And Create</a>
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
        <!-- <div class="add-student-header">
          <h3>Student Form</h3>
          <label for="add" class="fas fa-bars">
            <input type="checkbox" name="df" id="add" />
          </label>
        </div> -->

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

        <div class="student-form">
          <h2>Student Form</h2>
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
              placeholder="Student Name"
              v-model="student_name"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Phone Number"
              v-model="mobile"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Email"
              v-model="email"
            />

            <div
              style="
                border: 1px solid black;
                box-shadow: 1px 3px 3px 1px var(--primary);
                margin: 1rem;
              "
            >
              <p class="box-border-p" @click="open_batchs">
                {{ selected_batch_name }}
              </p>

              <p class="box-border-p">Fee : {{ get_batch_fee }}</p>

              <div style="display: flex">
                <label for="discount">Discount</label>
                <input
                  type="text"
                  class="student-property"
                  placeholder="Discount"
                  id="discount"
                  v-model="discount"
                />
              </div>
            </div>
            <input
              type="text"
              class="student-property"
              placeholder="Coaching Group"
              v-model="coachin_group"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Parent's Phone Number"
              v-model="parent_mobile"
            />
            <input
              type="number"
              class="student-property"
              placeholder="HSC/SSC/Equvalent Registration Number"
              v-model="registration_number"
            />
            <div class="dropdown">
              <span>{{ selected_hsc_group_name }}</span>
              <div class="dropdown-content" id="student-hsc-drop-down">
                <p @click="select_hsc_group('Science')">Science</p>
                <p @click="select_hsc_group('Arts')">Arts</p>
                <p @click="select_hsc_group('Commerce')">Commerce</p>
              </div>
            </div>
            <input
              type="number"
              class="student-property"
              placeholder="HSC Year"
              v-model="hsc_year"
            />
            <input
              type="number"
              class="student-property"
              placeholder="HSC Roll"
              v-model="hsc_roll"
            />
            <input
              type="number"
              class="student-property"
              placeholder="HSC GPA"
              v-model="hsc_gpa"
            />
            <div class="dropdown">
              <span>{{ selected_ssc_group_name }}</span>
              <div class="dropdown-content">
                <p @click="select_ssc_group('Science')">Science</p>
                <p @click="select_ssc_group('Arts')">Arts</p>
                <p @click="select_ssc_group('Commerce')">Commerce</p>
              </div>
            </div>
            <input
              type="number"
              class="student-property"
              placeholder="SSC Year"
              v-model="ssc_year"
            />
            <input
              type="number"
              class="student-property"
              placeholder="SSC Roll"
              v-model="ssc_roll"
            />
            <input
              type="number"
              class="student-property"
              placeholder="SSC GPA"
              v-model="ssc_gpa"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Address"
              v-model="address"
            />

            <button @click="create_student">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { process } from "ipaddr.js";
export default {
  data() {
    return {
      student_name: "",
      mobile: "",
      email: "",
      batch: [],
      coachin_group: "",
      parent_mobile: "",
      registration_number: "",
      hsc_group: null,
      hsc_year: "",
      hsc_roll: "",
      hsc_gpa: "",
      ssc_group: null,
      ssc_year: "",
      ssc_roll: "",
      ssc_gpa: "",
      address: "",

      selected_batch: null,
      discount: 0,
      selected_filter: "username",
      query: "",
      previous_query: "a",
      api_calling: false,
    };
  },
  methods: {
    get_students() {
      this.api_calling = true;
      // var token = localStorage.getItem("token");
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };

      var url = `${process.env.VUE_APP_BASE_URL}account/student`;
      if (this.selected_filter == "username") {
        url = `${url}?username=${this.query}`;
      } else if (this.selected_filter == "mobile") {
        url = `${url}?mobile=${this.query}`;
      } else {
        url = `${url}?pk=${this.query}`;
      }
      this.$store.commit("update_is_loading", true);
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

    create_student() {
      if (this.student_name == null || this.student_name == "") {
        return;
      }
      if (this.mobile == null || this.mobile == "") {
        return;
      }
      if (this.selected_batch == null) {
        return;
      }
      var file = document.getElementById("inputTag");
      console.log(file);
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
      params.append("username", this.student_name);
      params.append("mobile", this.mobile);
      params.append("email", this.email);
      params.append("batch", this.selected_batch.pk);
      params.append("parent_mobile", this.parent_mobile);
      params.append("group", this.coachin_group);
      params.append("registration_number", this.registration_number);
      var balance = -(this.selected_batch.fee - this.discount);
      params.append("balance", balance);
      var file = document.getElementById("inputTag");
      params.append("profile_picture", file.files[0]);

      params.append("hsc_group", this.hsc_group);
      // params.append("hsc_group", "Science");
      params.append("hsc_year", this.hsc_year);
      params.append("hsc_roll", this.hsc_roll);
      params.append("hsc_gpa", this.hsc_gpa);

      params.append("ssc_group", this.ssc_group);
      // params.append("ssc_group", "Science");
      params.append("ssc_year", this.ssc_year);
      params.append("ssc_roll", this.ssc_roll);
      params.append("ssc_gpa", this.ssc_gpa);

      params.append("password", this.mobile);
      params.append("password2", this.mobile);
      var url = `${process.env.VUE_APP_BASE_URL}account/register/student`;
      this.$store.commit("update_is_loading", true);
      axios
        .post(url, params, config)
        .then((response) => {
          this.get_students();
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
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

    select_hsc_group(abc) {
      this.hsc_group = abc;
    },

    select_ssc_group(abc) {
      this.ssc_group = abc;
    },

    student_hsc_dropdown() {
      document.getElementById("student-hsc-drop-down").style.display = "block";
    },

    open_student_form_dialog() {
      document.getElementsByClassName("student-form").style.maxHeight = "150vh";
    },

    close_student_form_dialog() {
      document.getElementById("student-form-dialog").style.display = "none";
    },

    navigate_update(pk) {
      this.$router.push({ path: `/student/${pk}` });
    },

    select_filter(abc) {
      this.selected_filter = abc;
    },

    onEnter() {
      console.log("on enter button");
      this.get_students();
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
    document.getElementById("student-batch-list-dialog").style.display = "none";
    document.getElementById("student-form-dialog").style.display = "none";

    // var checkbox = document.getElementById("add");
    // checkbox.addEventListener("change", function () {
    //   if (this.checked) {
    //     document.getElementsByClassName("student-form").style.display = "none";
    //   } else {
    //     console.log("Checkbox is not checked..");
    //   }
    // });
    this.get_students();
  },
  computed: {
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return t;
      }
      return this.$router.push("/");
    },
    students() {
      console.log("data of All " + this.$store.state.students);
      return this.$store.state.students;
    },
    batchs() {
      return this.$store.state.batchs;
    },

    selected_batch_name() {
      if (this.selected_batch == null) {
        return "-----Select Batch-----";
      }
      return this.selected_batch.name;
    },

    selected_hsc_group_name() {
      if (this.hsc_group == null) {
        return "-----HSC Group-----";
      }
      return this.hsc_group;
    },
    selected_ssc_group_name() {
      if (this.ssc_group == null) {
        return "-----SSC Group-----";
      }
      return this.ssc_group;
    },

    get_batch_fee() {
      if (this.selected_batch == null) {
        return "---";
      }
      return this.selected_batch.fee;
    },
  },
  watch: {
    query() {
      this.get_students();
    },
  },
};
</script>
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

    <header id="navbar">
      <div class="title">
        <input type="checkbox" id="side-menu-bar" />
        <label for="side-menu-bar" class="fas fa-bars"></label>
        <a href="#" class="logo">Students And Batch</a>
      </div>

      <nav class="navbar">
        <div class="details">
          <img
            src="{{ get_nav.profile_picture }}"
            width="30px"
            height="30px"
            alt=""
          />
          <div>
            <h4>{{ get_nav.username }}</h4>
            <!-- <small>Super user</small> -->
          </div>
        </div>
      </nav>
    </header>

    <div class="content-area">
      <div class="student">
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

            <p class="box-border-p" @click="open_batchs">
              {{ selected_batch_name }}
            </p>
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

            <button @click="update_student">Updae</button>
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
      selected_filter: "Name",
    };
  },
  methods: {
    get_student(pk) {
      var student = this.$store.state.students.find((o) => {
        o.pk == this.$route.params.pk;
      });
      if (student) {
        this.student_name = student.username;
        return;
      }
      // var token = localStorage.getItem("token");
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = "http://localhost:8000/api/account/student/" + pk;
      axios
        .get(url, config)
        .then((response) => {
          this.load_form_data(response.data);
          this.$store.commit("update_or_append_student", response.data);
        })
        .catch((error) => {})
        .finally(() => this.$store.commit("update_is_loading", false));
    },

    load_form_data(data) {
      this.student_name = data.username;
      this.mobile = data.mobile;
      this.email = data.email;
      this.parent_mobile = data.parent_mobile;
      this.coachin_group = data.group;
      this.registration_number = data.registration_number;
      this.hsc_group = data.hsc_group;
      this.hsc_year = data.hsc_year;
      this.hsc_roll = data.hsc_roll;
      this.hsc_gpa = data.hsc_gpa;
      this.ssc_group = data.ssc_group;
      this.ssc_year = data.ssc_year;
      this.ssc_roll = data.ssc_roll;
      this.ssc_gpa = data.ssc_gpa;
      this.address = data.address;
      this.selected_batch = {
        pk: data.batch,
        name: data.batch_name,
      };
    },

    update_student() {
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
      var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
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

      if (this.coachin_group != null && this.coachin_group != "") {
        params.append("group", this.coachin_group);
      }
      params.append("registration_number", this.registration_number);
      var balance = -(this.selected_batch.fee - this.discount);
      params.append("balance", balance);
      var file = document.getElementById("inputTag").files[0];
      if (file) {
        params.append("profile_picture", file);
      }
      if (this.hsc_group != null && this.hsc_group != "") {
        params.append("hsc_group", this.hsc_group);
      }

      if (this.hsc_year != null && this.hsc_year != "") {
        params.append("hsc_year", this.hsc_year);
      }

      if (this.hsc_roll != null && this.hsc_roll != "") {
        params.append("hsc_roll", this.hsc_roll);
      }

      if (this.hsc_gpa != null && this.hsc_gpa != "") {
        params.append("hsc_gpa", this.hsc_gpa);
      }

      if (this.ssc_group != null && this.ssc_group != "") {
        params.append("ssc_group", this.ssc_group);
      }

      if (this.ssc_year != null && this.ssc_year != "") {
        params.append("ssc_year", this.ssc_year);
      }

      if (this.ssc_roll != null && this.ssc_roll != "") {
        params.append("ssc_roll", this.ssc_roll);
      }

      if (this.ssc_gpa != null && this.ssc_gpa != "") {
        params.append("ssc_gpa", this.ssc_gpa);
      }

      params.append("address", this.address);

      params.append("password", this.mobile);
      params.append("password2", this.mobile);
      var url = `${process.env.VUE_APP_BASE_URL}/account/student/update/${this.$route.params.pk}`;
      this.$store.commit("update_is_loading", true);
      axios
        .put(url, params, config)
        .then((response) => {
          this.$router.push({
            path: "/",
          });
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
      console.log("slakfjiojdsf");

      document.getElementsByClassName("student-form").style.maxHeight = "150vh";
    },

    close_student_form_dialog() {
      document.getElementById("student-form-dialog").style.display = "none";
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
    this.get_student(this.$route.params.pk);
  },
  computed: {
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return t;
      }
      return this.$router.push("/");
    },
    student() {
      var student = this.$store.state.students.find((o) => {
        o.pk == this.$route.params.pk;
      });
      console.log(student);
      this.student_name = student.username;
      return student;
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
    get_nav() {
      var username = localStorage.getItem("managementtusherscarecomusername");
      var profile_picture = localStorage.getItem(
        "managementtusherscarecomprofilepicture"
      );
      return {
        username: username,
        profile_picture: profile_picture,
      };
    },
  },
  watch: {},
};
</script>









<style scoped>
.student-form {
  width: 100%;
  height: auto;
}
</style>
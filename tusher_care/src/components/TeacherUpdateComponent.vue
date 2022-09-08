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
        <div class="student-form" style="height: auto !important">
          <h2>Teacher Form</h2>
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
              v-model="teacher_name"
            />
            <span style="color: red">{{ teacher_name_status }}</span>
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

            <button @click="update_teacher">Update</button>
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
      teacher_name: "",
      mobile: "",
      email: "",
      address: "",
      teacher_name_status: "",
      mobile_status: "",
      email_status: "",

      selected_filter: "Name",
    };
  },
  methods: {
    get_teacher(pk) {
      var student = this.$store.state.teachers.find((o) => {
        o.pk == this.$route.params.pk;
      });
      if (student) {
        this.load_form_data(student);
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
      var url = "http://localhost:8000/api/account/teacher/" + pk;
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
      this.teacher_name = data.username;
      this.mobile = data.mobile;
      this.email = data.email;
      this.address = data.address;
    },

    update_teacher() {
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
      if (this.teacher_name != null && this.teacher_name != "") {
        params.append("username", this.teacher_name);
        this.teacher_name_status = "";
      } else {
        this.teacher_name_status = "Required field";
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

      var url =
        "http://localhost:8000/api/account/staff/update/" +
        this.$route.params.pk;
      axios
        .put(url, params, config)
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
    this.get_teacher(this.$route.params.pk);
  },
  computed: {
    teacher() {
      var teacher = this.$store.state.teachers.find((o) => {
        o.pk == this.$route.params.pk;
      });
      return teacher;
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
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
      <div class="exam">
        <div class="exam-list">
          <div class="exam-card" v-for="(item, index) in courses" :key="index">
            <div class="top">
              <div class="content">Name : {{ item.name }}</div>
              <div class="icons">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>

            <div class="detail">
              <p>Details : {{ item.description }}</p>
            </div>
          </div>
        </div>
        <div class="exam-form">
          <div class="student-form">
            <h2>Course Form</h2>
            <div class="form-field">
              <input
                type="text"
                class="student-property"
                placeholder="Exam Name"
                v-model="course_name"
              />
              <span style="color: red">{{ course_name_status }}</span>
              <textarea
                class="student-property"
                placeholder="Description"
                rows="7"
                cols="50"
                v-model="description"
              ></textarea>
              <button @click="create_course">Create</button>
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
      course_name: "",
      description: "",
      course_name_status: "",
    };
  },
  methods: {
    get_course() {
      // var token = localStorage.getItem("token");
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `${process.env.VUE_APP_BASE_URL}/academic/course`;
      this.$store.commit("update_is_loading", true);
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
      var token = this.token;
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
      var url = `${process.env.VUE_APP_BASE_URL}//academic/course/create`;
      this.$store.commit("update_is_loading", true);
      axios
        .post(url, params, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("update_is_loading", false);
        });
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
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return t;
      }
      return this.$router.push("/");
    },
    courses() {
      return this.$store.state.courses;
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
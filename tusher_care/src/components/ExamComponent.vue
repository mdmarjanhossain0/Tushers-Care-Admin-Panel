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

    <div class="list-dialog-blur" id="exam-course-selected-dialog">
      <div class="list-dialog">
        <i class="fa-solid fa-circle-xmark close" @click="close_courses"></i>
        <h1>Batch List</h1>
        <div class="list">
          <div
            class="exam-card"
            v-for="(item, index) in courses"
            :key="index"
            @click="select_course(item)"
          >
            <div class="top">
              <div class="content">Name : {{ item.name }}</div>
              <div class="icons">
                <i
                  class="fa-solid fa-trash"
                  style="color: var(--primary)"
                  v-if="item.is_selected"
                ></i>
                <i
                  class="fa-solid fa-trash"
                  style="color: var(--light)"
                  v-else
                ></i>
              </div>
            </div>

            <div class="detail">
              <p>Details : {{ item.description }}</p>
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
      <div class="exam">
        <div class="exam-list">
          <div class="exam-card" v-for="(item, index) in exams" :key="index">
            <div class="top">
              <div class="content"><b>Exam Name : </b>{{ item.name }}</div>
              <div class="icons">
                <i class="fa-solid fa-cloud-arrow-down"></i>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>

            <div class="detail">
              <p>Schedule : {{ item.schedule }}</p>
              <p v-if="item.is_result_published">Result : Published</p>
              <p v-else>Result : Not Published</p>
            </div>
          </div>
        </div>
        <div class="exam-form">
          <div class="student-form">
            <h2>Add Exam</h2>
            <div class="form-field">
              <input
                type="text"
                class="student-property"
                placeholder="Exam Name"
                v-model="exam_name"
              />
              <span>{{ exam_name_status }}</span>
              <p class="box-border-p" @click="open_batchs">
                {{ select_batch_name }}
              </p>
              <span>{{ selected_batch_status }}</span>
              <input
                type="date"
                id="birthday"
                class="student-property"
                name="birthday"
                v-model="schedule"
              />
              <p class="box-border-p" @click="open_courses">
                -----Select Course------
              </p>

              <span>{{ selected_courses_status }}</span>

              <span v-for="(item, index) in selected_courses" :key="index">{{
                item.name
              }}</span>
              <button @click="create_exam">Create</button>
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
      exam_name: "",
      schedule: "",
      selected_courses: [],
      selected_batch: null,
      api_calling: false,
      exam_name_status: "",
      selected_batch_status: "",
      selected_courses_status: "",
    };
  },
  methods: {
    get_exams() {
      this.api_calling = true;
      // var token = localStorage.getItem("token");
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `${process.env.VUE_APP_BASE_URL}/academic/exam`;
      this.$store.commit("update_is_loading", true);
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_exam", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.api_calling = false;
        });
    },

    create_exam() {
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
          // "Content-Type": "multipart/form-data",
        },
      };
      // const params = new URLSearchParams();
      if (this.exam_name != null && this.exam_name != "") {
        // params.append("name", this.exam_name);
        this.exam_name_status = "";
      } else {
        this.exam_name_status = "Required field";
        return;
      }
      if (this.selected_batch != null && this.selected_batch != "") {
        // params.append("batch", this.selected_batch.pk);
        this.selected_batch_status = "";
      } else {
        this.selected_batch_status = "Required field";
        return;
      }

      if (this.selected_courses.length > 0) {
        this.selected_courses_status = "";
      } else {
        this.selected_courses_status = "Must select minimum one course";
        return;
      }

      if (this.schedule != null && this.schedule != "") {
        // params.append("schedule", this.schedule);
        var courses = [];
        this.selected_courses.forEach((item) => {
          courses.push(item.pk);
        });
        var params = {
          name: this.exam_name,
          batch: this.selected_batch.pk,
          courses: courses,
          schedule: this.schedule + " 00:00:00",
        };
      } else {
        var courses = [];
        this.selected_courses.forEach((item) => {
          courses.push(item.pk);
        });
        var params = {
          name: this.exam_name,
          batch: this.selected_batch.pk,
          courses: courses,
        };
      }
      var url = `${process.env.VUE_APP_BASE_URL}/academic/exam/create`;
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

    onEnter() {
      console.log("on enter button");
      this.get_students();
    },

    open_courses() {
      console.log("sdklf");
      document.getElementById("exam-course-selected-dialog").style.display =
        "block";
    },
    close_courses() {
      document.getElementById("exam-course-selected-dialog").style.display =
        "none";
    },
    select_course(abc) {
      var new_selected_course = [];
      var exist = false;
      this.selected_courses.forEach((item) => {
        if (abc.pk != item.pk) {
          new_selected_course.push(item);
        } else {
          exist = true;
        }
      });
      if (!exist) {
        new_selected_course.push(abc);
      }
      this.selected_courses = new_selected_course;
      // this.courses();
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
    document.getElementById("exam-course-selected-dialog").style.display =
      "none";

    this.get_exams();
  },
  computed: {
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return t;
      }
      return this.$router.push("/");
    },
    batchs() {
      return this.$store.state.batchs;
    },
    exams() {
      return this.$store.state.exams;
    },
    courses() {
      var courses = this.$store.state.courses;
      var new_courses = [];
      courses.forEach((course) => {
        course["is_selected"] = false;
        this.selected_courses.forEach((item) => {
          if (course.pk == item.pk) {
            course["is_selected"] = true;
            // return;
          }
        });
        console.log(course);
        new_courses.push(course);
      });
      return courses;
    },

    select_batch_name() {
      if (this.selected_batch == null) {
        return "---Select Batch---";
      } else {
        return this.selected_batch.name;
      }
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
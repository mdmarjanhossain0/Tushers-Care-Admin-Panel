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
          <div
            class="exam-card"
            v-for="(item, index) in notifications"
            :key="index"
          >
            <div class="top">
              <div class="content"><b>Title : </b>{{ item.title }}</div>
              <div class="icons">
                <!-- <i class="fa-solid fa-trash"></i> -->
              </div>
            </div>

            <div class="detail">
              <p>Description : {{ item.description }}</p>
            </div>
          </div>
        </div>
        <div class="exam-form">
          <div class="student-form">
            <h2>Notice Form</h2>
            <div class="form-field">
              <input
                type="text"
                class="student-property"
                placeholder="Title"
                v-model="title"
              />

              <span>{{ title_status }}</span>
              <textarea
                class="student-property"
                placeholder="Description"
                rows="7"
                cols="50"
                v-model="description"
              ></textarea>

              <span>{{ description_status }}</span>
              <button @click="create_notification">Create</button>
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
      title: "",
      description: "",
      title_status: "",
      description_status: "",
    };
  },
  methods: {
    get_notifications() {
      // var token = localStorage.getItem("token");
      var token = "a5fa3086644fc21a6b0999cb965b11d23be14fd3";
      // var token = "384f1e8367e69a96a0f3fb149c1aacee5d83753b";
      console.log(token);
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `http://localhost:8000/api/notification/list`;
      this.$store.commit("update_is_loading", true);
      axios
        .get(url, config)
        .then((response) => {
          console.log(response.data.results);
          this.$store.commit("update_notification", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
        });
    },
    create_notification() {
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      const params = new URLSearchParams();

      if (this.title != null && this.title != "") {
        params.append("title", this.title);
        this.title_status = "";
      } else {
        this.title_status = "Required field";
        return;
      }

      if (this.description != null && this.description != "") {
        params.append("description", this.description);
        this.description_status = "";
      } else {
        this.description_status = "Required field";
        return;
      }
      var url = `${process.env.VUE_APP_BASE_URL}/notification/create`;
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
    this.get_notifications();
  },
  computed: {
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return t;
      }
      return this.$router.push("/");
    },
    notifications() {
      return this.$store.state.notifications;
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
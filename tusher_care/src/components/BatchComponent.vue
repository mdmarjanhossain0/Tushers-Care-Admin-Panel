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
      <div class="batch">
        <div class="add-student-header">
          <h3>Batch Name</h3>
          <i class="fa-solid fa-circle-chevron-down"></i>
        </div>
        <div class="batch-list">
          <div
            class="batch-card"
            v-for="(item, index) in batchs"
            :key="index"
            @click="navigate_batch_details(item.pk)"
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

        <div class="batch-form">
          <div class="student-form">
            <h2>Add Batch</h2>
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
                placeholder="Batch Name"
                v-model="batch_name"
              />
              <span id="batch_name_status" style="color: red">{{
                batch_name_status
              }}</span>
              <input
                type="text"
                class="student-property"
                placeholder="Title For Website"
                v-model="title"
              />

              <span style="color: red">{{ title_status }}</span>
              <textarea
                class="student-property"
                placeholder="Description"
                rows="7"
                cols="50"
                v-model="description"
              ></textarea>
              <span style="color: red">{{ description_status }}</span>
              <input
                type="number"
                class="student-property"
                placeholder="Fee"
                v-model="fee"
              />
              <span id="fee_status" style="color: red">{{ fee_status }}</span>
              <input
                type="number"
                class="student-property"
                placeholder="Discount"
                v-model="discount"
              />
              <span id="discount_status" style="color: red">{{
                discount_status
              }}</span>
              <button @click="create_batch">Create</button>
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
      batch_name: "",
      title: "",
      description: "",
      fee: null,
      discount: null,
      batch_name_status: "",
      fee_status: "",
      discount_status: "",
      title_status: "",
      description_status: "",
    };
  },
  methods: {
    create_batch() {
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
      var file = document.getElementById("inputTag").files[0];
      if (file != null) {
        params.append("image", file);
      }

      if (this.batch_name != null && this.batch_name != "") {
        params.append("name", this.batch_name);
        this.batch_name_status = "";
      } else {
        this.batch_name_status = "Required field";
        return;
      }

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

      if (this.fee != null && this.fee != "") {
        params.append("fee", this.fee);
        this.fee_status = "";
      } else {
        this.fee_status = "Required field";
        return;
      }

      if (this.discount != null && this.discount != "") {
        params.append("discount", this.discount);
        this.discount_status = "";
      } else {
        this.discount_status = "Required field";
        return;
      }
      var url = `${process.env.VUE_APP_BASE_URL}/account/batch/create`;
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

    navigate_batch_details(pk) {
      this.$router.push({
        path: `/batch/${pk}`,
      });
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
      return this.$store.state.students;
    },
    batchs() {
      return this.$store.state.batchs;
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
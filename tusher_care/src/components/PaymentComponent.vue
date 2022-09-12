<template>
  <div class="main-content" id="main-content">
    <div class="full-screen-dialog-blur" id="payment-dialog">
      <div class="full-screen-dialog">
        <i class="fa-solid fa-circle-xmark close" @click="close_dialog"></i>
        <div class="student">
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
                  :class="[
                    selected_filter === 'mobile' ? 'selected-filter' : '',
                  ]"
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
                v-for="(item, index) in all"
                :key="index"
                @click="select_user(item)"
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
              <span>---{{ selected_group_name }}---</span>
              <div class="dropdown-content">
                <p @click="select_group('Student')">Student Payment</p>
                <p @click="select_group('Teacher')">Teacher Payment</p>
                <p @click="select_group('Staff')">Staff Payment</p>
                <p @click="select_group('Other')">Other</p>
              </div>
            </div>
            <p
              class="box-border-p"
              @click="open_dialog"
              v-if="selected_group != 'Other'"
            >
              -----Select {{ selected_group }}------
            </p>
            <span style="color: red">{{ selected_user_status }}</span>
            <div
              style="
                border: 1px solid var(--primary);
                width: 90%;
                padding: 1rem;

                background: var(--primary);
                color: white;
              "
              v-if="selected_group != 'Other'"
            >
              <p>Selected {{ selected_group }} : {{ select_user_name }}</p>
              <p>Balance : {{ select_user_balance }}</p>
            </div>
            <input
              type="number"
              class="student-property"
              placeholder="Amount"
              v-model="amount"
            />
            <span style="color: red">{{ amount_status }}</span>
            <input
              type="number"
              class="student-property"
              placeholder="Fine"
              v-model="fine"
            />
            <input
              type="number"
              class="student-property"
              placeholder="Discount"
              v-model="discount"
            />
            <input
              type="text"
              class="student-property"
              placeholder="Note"
              v-model="note"
            />
            <button @click="create_payment">Create</button>
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
      selected_group: "Student",
      selected_user: null,
      amount: "",
      fine: "",
      discount: "",
      note: "",
      amount_status: "",
      fine_status: "",
      discount_status: "",
      note_status: "",
      selected_filter: "username",
      query: "",
      previous_query: "a",
      api_calling: false,

      selected_user_status: "",
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
    get_staffs() {
      this.api_calling = true;
      // var token = localStorage.getItem("token");
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `${process.env.VUE_APP_BASE_URL}account/staff`;
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
          this.$store.commit("update_staff", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.api_calling = false;
          this.previous_query = this.query;
        });
    },
    get_teachers() {
      this.api_calling = true;
      // var token = localStorage.getItem("token");
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      var url = `${process.env.VUE_APP_BASE_URL}account/teacher`;
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
          this.$store.commit("update_teacher", response.data.results);
        })
        .catch((error) => {})
        .finally(() => {
          this.$store.commit("update_is_loading", false);
          this.api_calling = false;
          this.previous_query = this.query;
        });
    },
    create_payment() {
      var token = this.token;
      const config = {
        headers: {
          Authorization: "Token " + token,
        },
      };
      const params = new URLSearchParams();

      params.append("type", this.selected_group_name);

      if (this.selected_group != "Other") {
        if (this.selected_user != null && this.selected_user != "") {
          params.append("account", this.selected_user.pk);
          this.selected_user_status = "";
        } else {
          this.selected_user_status = "Required field";
          return;
        }
      }

      if (this.amount != null && this.amount != "") {
        params.append("fee", this.amount);
        this.amount_status = "";
      } else {
        this.amount_status = "Required field";
        return;
      }

      if (this.fine != null && this.fine != "") {
        params.append("fine", this.fine);
      }

      if (this.discount != null && this.discount != "") {
        params.append("discount", this.discount);
      }

      if (this.note != null && this.note != "") {
        params.append("note", this.note);
      }

      var url = `${process.env.VUE_APP_BASE_URL}payment/student/create`;

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

    onEnter() {},

    select_group(abc) {
      if (this.selected_group != abc) {
        this.selected_user = null;
      }
      this.selected_group = abc;
    },

    select_user(abc) {
      this.selected_user = abc;
      this.close_dialog();
      // if (this.selected_group == "Student") {
      // } else if (this.selected_group == "Teacher") {
      // } else {
      // }
    },

    open_dialog() {
      document.getElementById("payment-dialog").style.display = "block";
    },

    close_dialog() {
      document.getElementById("payment-dialog").style.display = "none";
    },

    select_filter(abc) {
      this.selected_filter = abc;
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

    document.getElementById("payment-dialog").style.display = "none";
  },
  computed: {
    token() {
      var t = localStorage.getItem("managementtusherscarecom");
      if (t) {
        return t;
      }
      return this.$router.push("/");
    },

    selected_group_name() {
      if (this.selected_group == "Student") {
        this.get_students();
        return "Student Payment";
      } else if (this.selected_group == "Teacher") {
        this.get_teachers();
        return "Teacher Payment";
      } else if (this.selected_group == "Staff") {
        this.get_staffs();
        return "Staff Payment";
      } else {
        return "Other";
      }
    },

    all() {
      if (this.selected_group == "Student") {
        return this.$store.state.students;
      } else if (this.selected_group == "Teacher") {
        return this.$store.state.teachers;
      } else if (this.selected_group == "Staff") {
        return this.$store.state.staffs;
      } else {
        return [];
      }
    },

    select_user_name() {
      if (this.selected_user == null || this.selected_user == "") {
        return "";
      } else {
        return this.selected_user.username;
      }
    },

    select_user_balance() {
      if (this.selected_user == null || this.selected_user == "") {
        return "";
      } else {
        return this.selected_user.balance;
      }
    },
  },
  watch: {},
};
</script>


<style scoped>
.student-list {
  width: 100%;
}
</style>
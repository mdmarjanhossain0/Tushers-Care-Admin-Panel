<template>
  <div class="main-content" id="main-content">
    <header id="navbar">
      <div class="title">
        <a href="#" class="logo">Tusher's Care Admin Dashboard</a>
      </div>
    </header>

    <div class="content-area">
      <div class="student">
        <div class="student-form">
          <h2>Log In Form</h2>
          <div class="form-field" id="form">
            <input
              type="text"
              class="student-property"
              placeholder="Phone Number"
              v-model="mobile"
            />

            <span style="color: red">{{ mobile_status }}</span>
            <input
              type="password"
              class="student-property"
              placeholder="Password"
              v-model="password"
            />

            <span style="color: red">{{ password_status }}</span>

            <button @click="test">Log In</button>
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
      mobile: "",
      password: "",
      mobile_status: "",

      password_status: "",
    };
  },
  methods: {
    test() {
      var params = new FormData();
      var config = {
        baseURL: "http//localhost:8000/",
      };
      var url = "http//localhost:8000/api/account/login";
      axios.post(url, params, config).then((response) => {});
    },
    login() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const params = new URLSearchParams();

      if (this.mobile != null && this.mobile != "") {
        params.append("username", this.mobile);
        this.mobile_status = "";
      } else {
        this.mobile_status = "Enter valid mobile number";
        return;
      }
      if (this.password != null && this.password != "") {
        params.append("password", this.password);
        this.password_status = "";
      } else {
        this.password_status = "Enter valid mobile number";
        return;
      }
      axios.defaults.baseURL = "http//localhost:8000/";
      var url = "http//localhost:8000/api/account/login";
      axios
        .post(url, params, config)
        .then((response) => {
          console.log(response.data.error_message);
          if (!response.data.error_message) {
            var tokenStore = localStorage.setItem(
              "management.tushers-care.com",
              response.data.token
            );
            if (tokenStore) {
            }
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("balance", response.data.balance);
            localStorage.setItem("pk", response.data.pk);
            if (
              !response.data.is_admin &&
              !response.data.is_staff &&
              !response.data.is_teacher
            ) {
              localStorage.setItem("is_student", true);
            }
            this.$router.push("/");
          } else {
            console.log("error message null");
          }
        })
        .catch((error) => {})
        .finally(() => this.$store.commit("update_is_loading", false));
    },
  },
  computed: {
    token() {
      // var t = localStorage.getItem("token");
      // if (t) {
      //   this.$router.push("/profile");
      // }
      return "";
    },
  },
};
</script>

<style scoped>
#main-content {
  width: 100% !important;
  margin: 0;
}

header {
  display: flex;
  justify-content: center;
  height: 5rem;
}
.student {
  justify-content: center;
  background: var(--light);
}
.student-from {
  width: 100%;
}
</style>
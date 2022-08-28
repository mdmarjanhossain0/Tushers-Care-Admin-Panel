<template>
  <div class="login">
    <form method="post" @submit.prevent="login">
      <div class="imgcontainer">
        <img src="../assets/logo-01.png" alt="Avatar" class="avatar" />
      </div>
      <div class="title">
        <h1>Student Log in {{ token }}</h1>
      </div>
      <div class="container">
        <label for="uname"><b>Username</b></label>
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          required
          v-model="mobile"
        />

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          v-model="password"
        />

        <button>Login</button>
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>
      </div>

      <div class="container" style="background-color: #f1f1f1">
        <button type="button" class="cancelbtn">Cancel</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mobile: "",
      password: "",
    };
  },
  methods: {
    login() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const params = new URLSearchParams();
      params.append("username", this.mobile);
      params.append("password", this.password);
      var url = "https://tushers-care.com/api/account/login";
      axios
        .post(url, params, config)
        .then((response) => {
          console.log(response.data.error_message);
          if (!response.data.error_message) {
            var tokenStore = localStorage.setItem("token", response.data.token);
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
            this.$router.push("/profile");
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
      var t = localStorage.getItem("token");
      if (t) {
        this.$router.push("/profile");
      }
      return "";
    },
  },
};
</script>
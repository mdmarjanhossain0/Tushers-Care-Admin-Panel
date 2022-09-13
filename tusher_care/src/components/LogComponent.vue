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

            <button @click="login">Log In</button>
            <span
              style="
                font-weight: bold;
                margin: 1rem;
                color: red;
                font-size: 2rem;
              "
              >{{ response }}</span
            >
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
      response: "",
    };
  },
  methods: {
    login() {
      this.response = "";
      var url = `${process.env.VUE_APP_BASE_URL}/account/login`;
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

      this.$store.commit("update_is_loading", true);
      axios
        .post(url, params)
        .then((response) => {
          console.log(response.data);

          this.response = response.data.error_message;
          if (
            response.data.error_message == null ||
            response.data.error_message == ""
          ) {
            if (response.data.is_admin || response.data.is_staff) {
              localStorage.setItem(
                "managementtusherscarecom",
                response.data.token
              );
              localStorage.setItem(
                "managementtusherscarecomusername",
                response.data.username
              );
              localStorage.setItem(
                "managementtusherscarecomprofilepicture",
                response.data.profile_picture
              );
              location.reload();
            } else {
              this.response = "You are not admin or staff.";
            }
          }
        })
        .catch((error) => {
          this.response = "wrong username or password";
        })
        .finally(() => {
          this.$store.commit("update_is_loading", false);
        });
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
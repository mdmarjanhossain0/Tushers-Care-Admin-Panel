import {
  createStore
} from 'vuex'

export default createStore({
  getters: {
  //   get_current_page_number (state) {
  //   return state.total_data
  // }
  },
  mutations: {},
  actions: {},
  state: {
    is_loading: false,
    students: [],
    exams: [],
    payments: [],
    teachers: [],
    staffs: [],
    batchs: [],
    courses: [],
    notifications: [],
    side_bar_selected_tab: "student",
    is_posting: false
  },
  mutations: {
    update_is_loading(state, data) {
      state.is_loading = data
    },

    update_student(state, data) {
      state.students = data
    },

    update_or_append_student(state, data) {
      for (var i = 0; i < state.students.length; i++) {
        if (state.students[i].pk == data.pk) {
          state.students[i] = data
          break
        }
      }
      state.students.push(data)
    },

    update_batch(state, data) {
      state.batchs = data
    },
    update_side_bar_selected_tab(state, data) {
      state.side_bar_selected_tab = data
    },

    update_course(state, data) {
      state.courses = data
    },

    update_exam(state, data) {
      state.exams = data
    },

    update_notification(state, data) {
      state.notifications = data
    },


    update_staff(state, data) {
      state.staffs = data
    },

    update_teacher(state, data) {
      state.teachers = data
    }
  }
})
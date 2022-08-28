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
    courses: []
  },
  mutations: {
    update_is_loading(state, data) {
      state.is_loading = data
    },

    update_student(state, data) {
      state.students = data
    },
  }
})
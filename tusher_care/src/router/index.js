import {
  createRouter,
  createWebHistory
} from 'vue-router'
import AdminView from '../views/HomeView.vue'
import StudentUpdateView from '../views/StudentUpdateView.vue'
import BatchView from '../views/BatchView.vue'
import BatchStudentView from '../views/BatchStudentView.vue'
import CourseView from '../views/CourseView.vue'
import ExamView from '../views/ExamView.vue'
import NoticeView from '../views/NoticeView.vue'
import PaymentView from '../views/PaymentView.vue'
import StaffView from '../views/StaffView.vue'
import TeacherView from '../views/TeacherView.vue'
import StaffUpdateView from '../views/StaffUpdateView.vue'
import TeacherUpdateView from '../views/TeacherUpdateView.vue'
import ReportView from '../views/ReportView.vue'

const routes = [{
    path: '/student/:pk',
    name: 'update',
    component: StudentUpdateView
  },
  {
    path: '/batch/:pk',
    name: 'batchstudent',
    component: BatchStudentView
  },
  {
    path: '/batch',
    name: 'batch',
    component: BatchView
  },

  {
    path: '/course',
    name: 'course',
    component: CourseView
  },
  {
    path: '/exam',
    name: 'exam',
    component: ExamView
  },
  {
    path: '/notice',
    name: 'notice',
    component: NoticeView
  },
  {

    path: '/payment',
    name: 'payment',
    component: PaymentView
  },
  {
    path: '/staff',
    name: 'staff',
    component: StaffView
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: TeacherView
  },
  {
    path: '/staff/:pk',
    name: 'staff-update',
    component: StaffUpdateView
  },
  {
    path: '/teacher/:pk',
    name: 'teacher-update',
    component: TeacherUpdateView
  },









  {
    path: '/report',
    name: 'report',
    component: ReportView
  },

  {
    path: '/',
    name: 'home',
    component: AdminView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
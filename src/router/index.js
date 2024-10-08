import { createRouter, createWebHistory } from 'vue-router';

// Importar componentes
import Home from '@/views/Website/Home.vue';
import Login from '@/views/Security/Login.vue';
import Register from '@/views/Security/Register.vue';
import AdminDashboard from '@/views/Dashboards/Admin/Dashboard.vue';
import ReceptionistDashboard from '@/views/Dashboards/receptionist/Dashboard.vue';
import OperationsAssistantDashboard from '@/views/Dashboards/Op.Asist/Dashboard.vue';
import ManageRequest from '/workspaces/FrontEnd-GrupoFLK_LAT/src/views/UseCases/Admin/ManageRequest/View.vue';

// Definir las rutas
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/services', component: Services },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  {
    path: '/admin-dashboard/ManagementServices',
    component: ManagementServices,
    meta: { requiresAuth: true, role: 'Administrador' },
  },
  {
    path: '/manage-requests',
    component: ManageRequest,
  },
  {
    path: '/manage-courses',
    component: View,
  },
  {
    path: '/create-course',
    name: 'CreateCourse',  // Nombre de la ruta para el formulario de creación de cursos
    component: CreateCourse,
  },
  
  {
    path: '/details/:id',  // Ruta para mostrar los detalles de una solicitud
    name: 'Details',  // Nombre de la ruta que estás usando
    component: Details,
  },  

  // Requiere Rol de Recepcionista
  {
    path: '/receptionist-dashboard',
    component: ReceptionistDashboard,
    /* meta: { requiresAuth: true, role: 'Recepcionista' } */
  },
  
  // Requiere Rol de Asistente de Operaciones
  {
    path: '/operations-assistant-dashboard',
    component: OperationsAssistantDashboard,
    /* meta: { requiresAuth: true, role: 'Asistente de Operaciones' } */
  },
  // Requiere Rol de Trainer(Formador)
  {
    path: '/trainer-dashboard',
    component: TrainerDashboard,
    /* meta: { requiresAuth: true, role: 'Formador' }, */
  },
    // Requiere Rol de Operator
   {
      path: '/operator-dashboard',
      component: OperatorDashboard,
      /* meta: { requiresAuth: true, role: 'Operador' } */
    }, 
    {
      path: '/operator-dashboard/Courses',
      component: Courses,
      /* meta: { requiresAuth: true, role: 'Administrador' } */
    },

   // Requiere Rol de Instructor
   {
    path: '/instructor-dashboard',
    component: InstructorDashboard,
   /*  meta: { requiresAuth: true, role: 'Instructor' } */
   },
];

// Crear el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard para proteger rutas según autenticación y rol
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtener el perfil del usuario de localStorage

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!user) {
      console.warn("Ruta protegida. Redirigiendo a login.");
      return next({ path: '/login' }); // Redirige a login si no hay sesión
    }

    console.log("Usuario autenticado:", user);

    // Verificar el rol del usuario
    if (to.meta.role && to.meta.role !== user.rol) {
      console.warn(`Acceso denegado. Se requiere rol ${to.meta.role}, pero el usuario tiene rol ${user.rol}.`);
      return next({ path: '/' }); // Redirigir a la página de inicio si el rol no coincide
    }
  }

  // Si todo está bien, permitir el acceso
  next();
});

export default router;

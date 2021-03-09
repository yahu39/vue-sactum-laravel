import Vue from "vue";
import VueRouter from "vue-router";

import IndexMain from "./../components/views/main/IndexMain.vue";
import Login from "./../components/views/auth/Login.vue";
import Register from "./../components/views/auth/Register.vue";
import Dashboard from "./../components/views/main/Dashboard.vue";
import Accounts from "./../components/views/main/AccountData.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Main",
        component: IndexMain,
        meta: { requiresAuth: true },
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                meta: { requiresAuth: true },
                components: {
                    default: IndexMain,
                    MainView: Dashboard
                }
            },
            {
                path: "/accounts",
                name: "Accounts",
                components: {
                    default: IndexMain,
                    MainView: Accounts
                }
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guest: true }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guest: true }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

function loggedIn() {
    return localStorage.getItem("token"); // if token = true else false
}

//Proteger nuestra pagina si no estan logeados
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!loggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (loggedIn()) {
            //so if user loggeIn true   -> redirect to dashboard
            next({
                path: "/dashboard",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});
// end

export default router;

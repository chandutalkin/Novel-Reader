import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("./components/home.vue")
    },
    {
      path: "/novels",
      name: "novels",
      component: () => import("./components/home.vue"),
      props: route => ({ query: route.query.q })
    },
    {
      path: "/novels/:slug/chapters/:chapter",
      name: "chapterPage",
      component: () => import("./components/chapter.vue")
    },
    {
      path: "/novels/:slug",
      name: "novelPage",
      component: () => import("./components/productDetail.vue")
    }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
      // Start the route progress bar.
      
    }
    next()
  })
  
  router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
   
  })
  
  export default router;
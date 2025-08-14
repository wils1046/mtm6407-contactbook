import { createRouter, createWebHistory } from "vue-router";
import ContactList from "../views/ContactList.vue";
import ContactDetails from "../views/ContactDetails.vue";
import ContactForm from "../views/ContactForm.vue";

const routes = [
  {
    path: "/",
    name: "ContactList",
    component: ContactList,
  },
  {
    path: "/contact/:id",
    name: "ContactDetails",
    component: ContactDetails,
    props: true,
  },
  {
    path: "/add",
    name: "AddContact",
    component: ContactForm,
  },
  {
    path: "/edit/:id",
    name: "EditContact",
    component: ContactForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
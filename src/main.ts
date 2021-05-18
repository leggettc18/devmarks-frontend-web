import { createApp } from "vue";
import { stateSymbol, createState } from "./store/store";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import ElementPlus from "element-plus";
import "@/assets/styles.scss";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("user-token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
  return forward(operation);
});

const httpLink = createHttpLink({
  uri: "http://localhost:9092/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .provide(stateSymbol, createState())
  .directive("clickoutside", {
    beforeMount: (el, binding) => {
      // assign event to the element
      el.clickOutsideEvent = function(event: Event) {
        // here we check if the click event is outside the element and it's children
        if (!(el == event.target || el.contains(event.target))) {
          // if clicked outside, call the provided method
          binding.value(event, el);
        }
      };
      // register click and touch events
      document.body.addEventListener("click", el.clickOutsideEvent);
      document.body.addEventListener("touchstart", el.clickOutsideEvent);
    },
    unmounted: function(el) {
      // unregister click and touch events before the element is unmounted
      document.body.removeEventListener("click", el.clickOutsideEvent);
      document.body.removeEventListener("touchstart", el.clickOutsideEvent);
    },
  })
  .use(router)
  .use(ElementPlus)
  .mount("#app");

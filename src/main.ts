import { createApp } from "vue";
import { stateSymbol, createState } from "./store/store";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import ElementPlus from "element-plus";
import "@/assets/styles.scss";

const getHeaders = () => {
  const headers = { authorization: "" };
  const token = localStorage.getItem("user-token");
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const httpLink = createHttpLink({
  uri: "http://localhost:9092/graphql",
  headers: getHeaders(),
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .provide(stateSymbol, createState())
  .use(router)
  .use(ElementPlus)
  .mount("#app");

import type { App } from "vue";
import pkg from "../package.json";
import SimpleExcel from "./component/SimpleExcel.vue";

const install = (app: App) => {
  app.component("SimpleExcel", SimpleExcel);
  console.log("test");
  debugger;
};

export { SimpleExcel };

export default {
  install,
  version: pkg.version,
};

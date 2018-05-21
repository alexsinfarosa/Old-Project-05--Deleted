import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// material-ui picker
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import enLocale from "date-fns/locale/en-US";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";

// Mobx
import { Provider } from "mobx-react";
import { RootStore } from "./models/RootStore";
const fetcher = url => window.fetch(url).then(res => res.json());
const app = RootStore.create({}, { fetch: fetcher });

ReactDOM.render(
  <Provider app={app}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

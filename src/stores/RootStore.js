import { decorate, observable, action } from "mobx";

import ParamsStore from "./ParamsStore";

export default class RootStore {
  constructor(fetcher) {
    this.paramsStore = new ParamsStore();
  }

  // logic -------------------------------------------------------------------
  isLoading = false;
  isInfo = true;
  toggleInfo = d => (this.isInfo = !this.isInfo);
}

decorate(RootStore, {
  isLoading: observable,
  isInfo: observable,
  toggleInfo: action
});

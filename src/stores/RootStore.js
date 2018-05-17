import { decorate, observable, action, when } from "mobx";
import ParamsStore from "./ParamsStore";
import fetchData from "../utils/fetchData";

export default class RootStore {
  constructor(fetcher) {
    this.paramsStore = new ParamsStore();
    when(
      () => this.paramsStore.params,
      () => this.loadData(this.paramsStore.params)
    );
  }

  // logic -------------------------------------------------------------------
  isLoading = false;
  isInfo = true;
  toggleInfo = d => (this.isInfo = !this.isInfo);

  // fetch data --------------------------------------------------------------
  data = [];
  setData = d => (this.data = d);
  loadData = async params => {
    this.data = await fetchData(params);
  };
}

decorate(RootStore, {
  isLoading: observable,
  isInfo: observable,
  toggleInfo: action,
  data: observable,
  setData: action
});

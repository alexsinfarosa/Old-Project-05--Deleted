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
  isInfo = false; // put back to false
  toggleInfo = d => (this.isInfo = !this.isInfo);

  isAddBlock = true;
  openIsAddBlock = () => (this.isAddBlock = true);
  closeIsAddBlock = () => (this.isAddBlock = false);
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
  isAddBlock: observable,
  openIsAddBlock: action,
  closeIsAddBlock: action,
  data: observable,
  setData: action
});

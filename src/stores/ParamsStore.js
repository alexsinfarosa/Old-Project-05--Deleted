import { decorate, observable, action } from "mobx";

export default class ParamsStore {
  isLoading = false;
  data = [];

  isInfo = true;
  toggleInfo = d => (this.isInfo = !this.isInfo);
}

decorate(ParamsStore, {
  isLoading: observable,
  data: observable,
  isInfo: observable,
  toggleInfo: action
});

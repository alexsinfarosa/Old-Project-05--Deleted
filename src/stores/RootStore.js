import ParamsStore from "./ParamsStore";

export default class RootStore {
  constructor(fetcher) {
    this.paramsStore = new ParamsStore();
  }
}

import { decorate, observable, action } from "mobx";
import { allStates } from "../assets/allStates";

import BlockStore from "./BlockStore";

export default class RootStore {
  constructor() {
    this.blockStore = new BlockStore(this);
  }

  // states --------------------------------------------------------------------
  states = Object.keys(allStates).map(id => allStates[id]);

  // logic ---------------------------------------------------------------------
  isLoading = false;
  isInfo = false; // put back to false
  toggleInfo = d => (this.isInfo = !this.isInfo);

  isAddBlock = false;
  openIsAddBlock = () => (this.isAddBlock = true);
  closeIsAddBlock = () => (this.isAddBlock = false);

  isBlockList = false;
  openIsBlockList = d => (this.isBlockList = true);
}

decorate(RootStore, {
  isLoading: observable,
  isInfo: observable,
  toggleInfo: action,
  isAddBlock: observable,
  openIsAddBlock: action,
  closeIsAddBlock: action,
  isBlockList: observable,
  openIsBlockList: action
});

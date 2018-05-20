import { decorate, observable, action, when } from "mobx";
import { allStates } from "../assets/allStates";
import { fetchAllStations } from "../utils/fetchData";

import BlocksStore from "./BlocksStore";

export default class RootStore {
  constructor() {
    when(
      () => this.stations.length === 0,
      () =>
        fetchAllStations().then(res => {
          console.log("called");
          this.setStations(res);
          this.blocksStore = new BlocksStore(this.states, this.stations);
        })
    );
  }

  // states --------------------------------------------------------------------
  states = Object.keys(allStates).map(id => allStates[id]);

  // stations ------------------------------------------------------------------
  stations = [];
  setStations = d => (this.stations = d);

  // logic ---------------------------------------------------------------------
  isLoading = false;
  isInfo = false; // put back to false
  toggleInfo = d => (this.isInfo = !this.isInfo);

  isAddBlock = false;
  openIsAddBlock = () => (this.isAddBlock = true);
  closeIsAddBlock = () => (this.isAddBlock = false);
}

decorate(RootStore, {
  stations: observable,
  setStations: action,
  isLoading: observable,
  isInfo: observable,
  toggleInfo: action,
  isAddBlock: observable,
  openIsAddBlock: action,
  closeIsAddBlock: action
});

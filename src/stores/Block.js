import { decorate, observable, action, computed, when } from "mobx";
import { fetchAllStations } from "../utils/fetchData";
import uuidv5 from "uuid/v5";

export default class Block {
  id = null;
  blockStore = null;

  constructor(
    blockStore,
    name,
    varietyName,
    statePostalCode,
    stationID,
    startDate = null,
    firstSpray = null,
    secondSpray = null,
    thirdSpray = null,
    endDate = null,
    avgStyleLength = null,
    data = [],
    isMessage = true,
    isBeingSelected = false,
    isBeingEdited = false,
    id = uuidv5()
  ) {
    this.blockStore = blockStore;
    this.id = id;

    this.name = name;
    this.varietyName = varietyName;
    this.statePostalCode = statePostalCode;
    this.stationID = stationID;
    this.startDate = startDate;
    this.firstSpray = firstSpray;
    this.secondSpray = secondSpray;
    this.thirdSpray = thirdSpray;
    this.endDate = endDate;
    this.avgStyleLength = avgStyleLength;
    this.data = data;
    this.isMessage = isMessage;
    this.isBeingSelected = isBeingSelected;
    this.isBeingEdited = isBeingEdited;

    when(
      () => this.stations.length === 0,
      () =>
        fetchAllStations().then(res => {
          this.setStations(res);
        })
    );
  }

  // fields --------------------------------------------------------------------
  setField = name => event => {
    this[name] = event.target.value;
  };

  cleanFields = () => {
    this.id = undefined;
    this.name = undefined;
    this.varietyName = undefined;
    this.statePostalCode = undefined;
    this.stationID = undefined;
    this.startDate = undefined;
    this.firstSpray = undefined;
    this.secondSpray = undefined;
    this.thirdSpray = undefined;
    this.endDate = undefined;
    this.avgStyleLength = undefined;
    this.isMessage = true;
    this.data = undefined;
    this.isBeingSelected = false;
    this.isBeingEdited = false;
  };

  // state ---------------------------------------------------------------------
  get state() {
    return this.states.find(state => state.id === this.statePostalCode);
  }

  // stations ------------------------------------------------------------------
  stations = [];
  setStations = d => (this.stations = d);
  get currentStateStations() {
    return this.statePostalCode === "ALL"
      ? this.stations
      : this.stations.filter(stn => stn.state === this.statePostalCode);
  }

  get station() {
    if (this.stationID.length !== 0) {
      return this.stations.find(stn => stn.id === this.stationID);
    }
  }
}

decorate(Block, {
  name: observable,
  varietyName: observable,
  statePostalCode: observable,
  state: computed,
  stationID: observable,
  stations: observable,
  setStations: action,
  currentStateStations: computed,
  station: computed,
  startDate: observable,
  firstSpray: observable,
  secondSpray: observable,
  thirdSpray: observable,
  endDate: observable,
  avgStyleLength: observable,
  isMessage: observable,
  data: observable,
  isBeingSelected: observable,
  isBeingEdited: observable,
  setField: action,
  cleanFields: action
});

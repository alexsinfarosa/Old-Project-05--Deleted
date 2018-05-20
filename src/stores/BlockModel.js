import { decorate, observable, action, computed } from "mobx";

export default class BlockModel {
  constructor(states, stations, blocks) {
    this.states = states;
    this.stations = stations;
    this.blocks = blocks;
  }

  id;
  name;
  varietyName;
  statePostalCode;
  stationID;
  startDate;
  firstSpray;
  secondSpray;
  thirdSpray;
  endDate;
  avgStyleLength;
  isMessage = true;
  data;
  isBeingSelected = false;
  isBeingEdited = false;

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

  // states --------------------------------------------------------------------
  get state() {
    return this.states.find(state => state.id === this.statePostalCode);
  }

  // stations ------------------------------------------------------------------
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

  addBlock = () => {
    this.blocks.push(this);
  };
}

decorate(BlockModel, {
  id: observable,
  name: observable,
  varietyName: observable,
  statePostalCode: observable,
  state: computed,
  stationID: observable,
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
  cleanFields: action,
  addBlock: action
});

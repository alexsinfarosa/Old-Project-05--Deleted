import { decorate, observable, action, when, computed } from "mobx";
import { states } from "../assets/states";
import { fetchAllStations } from "../utils/fetchData";
import { idAdjustment } from "../utils/utils";
import { format, subDays } from "date-fns";
import { elements } from "../assets/elements";
import { growthRates } from "../assets/growthRates";

export default class ParamsStore {
  constructor() {
    when(() => this.stations.length === 0, () => this.loadAllStations());
  }

  // apple varieties -----------------------------------------------------------
  variety = "";
  setVariety = d => (this.variety = d);

  get varieties() {
    return growthRates.map(v => v.name);
  }

  // states ---------------------------------------------------------------------
  stateIDs = Object.keys(states);
  get states() {
    return this.stateIDs.map(id => states[id]);
  }
  // state
  postalCode = "";
  setPostalCode = e => (this.postalCode = e.target.value);
  get state() {
    return this.states.find(state => state.id === this.postalCode);
  }

  // stations -------------------------------------------------------------------
  stations = [];
  loadAllStations = async () => {
    this.stations = await fetchAllStations();
  };
  // station
  stationID = "acc";
  setStationID = e => (this.stationID = e.target.value);
  get station() {
    if (this.stationID.length !== 0) {
      return this.stations.find(stn => stn.id === this.stationID);
    }
  }

  // Dates
  sDate = new Date(); // date of interest
  setStartDate = d => (this.sDate = d);
  eDate = new Date();
  setEndDate = d => (this.eDate = d);

  // parameters to make the call
  get params() {
    const { station, sDate, eDate } = this;
    if (station) {
      return {
        sid: `${idAdjustment(station)} ${station.network}`,
        sdate: format(subDays(new Date(sDate), 1), "YYYY-MM-dd"),
        edate: format(eDate, "YYYY-MM-dd"),
        elems: [elements["temp"][this.station.network]]
      };
    }
  }
}

decorate(ParamsStore, {
  variety: observable,
  setVariety: action,
  varieties: computed,
  stateIDs: observable,
  states: computed,
  postalCode: observable,
  setPostalCode: action,
  state: computed,
  stations: observable,
  stationID: observable,
  setStationID: action,
  station: computed,
  sDate: observable,
  eDate: observable,
  params: computed
});

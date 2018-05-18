import { decorate, observable, action, when, computed } from "mobx";
import { states } from "../assets/states";
import { fetchAllStations } from "../utils/fetchData";
import { idAdjustment } from "../utils/utils";
import { getYear, format, subDays, isAfter, isSameYear } from "date-fns/esm";
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

  // average style length ------------------------------------------------------
  avgStyleLength;
  setAvgStyleLength = d => (this.avgStyleLength = d);

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

  // Dates ------------------------------------------------------------------------
  /**
   sDate is the date of interest. It must be of type string and not a date object because it is passed in the subDays function. We must preserve the hour.
   */
  sDate = new Date("2018-05-10 10:00");
  setStartDate = d => (this.sDate = d);
  endOfSeason = `${getYear(this.sDate)}-07-01 23:00`;
  setEndOfSeason = d => (this.endOfSeason = d);
  get eDate() {
    if (this.sDate) {
      if (!isSameYear(new Date(), new Date(this.sDate))) {
        if (isAfter(new Date(this.sDate), new Date(this.endOfSeason))) return;
        return this.endOfSeason;
      } else {
        return new Date();
      }
    }
  }

  // parameters to make the call
  get params() {
    const { station, sDate, eDate } = this;
    const startDate = format(sDate, "yyyy-MM-dd");
    if (station && sDate && eDate) {
      return {
        sid: `${idAdjustment(station)} ${station.network}`,
        sdate: format(subDays(startDate, 1), "yyyy-MM-dd"),
        sdateUnformatted: sDate,
        edateUnformatted: eDate,
        edate: format(eDate, "yyyy-MM-dd"),
        elems: [elements["temp"][this.station.network]]
      };
    }
  }
}

decorate(ParamsStore, {
  variety: observable,
  setVariety: action,
  varieties: computed,
  avgStyleLength: observable,
  setAvgStyleLength: action,
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
  endOfSeason: observable,
  setEndOfSeason: action,
  eDate: computed,
  params: computed
});

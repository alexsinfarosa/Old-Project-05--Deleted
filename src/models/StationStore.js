import { types } from "mobx-state-tree";

const Station = types.model("Station", {
  id: types.string
});

export const StationStore = types
  .model("StationStore", {
    stations: types.array(Station)
  })
  .actions(self => ({
    async loadStations() {
      const response = await window.fetch(
        `${
          window.location.protocol
        }//newa2.nrcc.cornell.edu/newaUtil/stateStationList/all`
      );
      const stations = await response.json();
      console.log(stations);
      // self.addStations(stations);
    },
    addStations(stations) {
      self.stations.push(stations);
    }
  }));

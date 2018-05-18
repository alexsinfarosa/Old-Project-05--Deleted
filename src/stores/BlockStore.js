import { decorate, observable, action, when, computed } from "mobx";

export default class BlockStore {
  id;
  name;
  variety;
  state;
  station;
  startDate;
  firstSpray;
  secondSpray;
  thirdSpray;
  endDate;
  avgStyleLength;
  isMessage;
  data;
  isBeingSelected;
  isBeingEdited;

  setField = e => {
    this[e.target.name] = e.target.value;
  };
}

decorate(BlockStore, {
  id: observable,
  name: observable,
  variety: observable,
  state: observable,
  station: observable,
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
  setField: action
});

import { decorate, observable, action, when, computed } from "mobx";

export default class BlockModel {
  constructor({
    id,
    name,
    variety,
    state,
    station,
    startDate,
    firstSpray,
    secondSpray,
    thirdSpray,
    endDate,
    avgStyleLength,
    isMessage,
    data,
    isBeingSelected,
    isBeingEdited
  }) {
    this.id = id;
    this.name = name;
    this.variety = variety;
    this.state = state;
    this.station = station;
    this.startDate = startDate;
    this.firstSpray = firstSpray;
    this.secondSpray = secondSpray;
    this.thirdSpray = thirdSpray;
    this.endDate = endDate;
    this.avgStyleLength = avgStyleLength;
    this.isMessage = isMessage;
    this.data = data;
    this.isBeingSelected = isBeingSelected;
    this.isBeingEdited = isBeingEdited;
  }

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
  isMessage = true;
  data = [];
  isBeingSelected = false;
  isBeingEdited = false;
}

decorate(BlockModel, {
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
  isBeingEdited: observable
});

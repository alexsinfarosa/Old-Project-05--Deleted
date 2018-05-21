import { types } from "mobx-state-tree";
import { Block, BlockStore } from "./BlockStore";
import { ViewStore } from "./ViewStore";

export const RootStore = types.model("RootStore", {
  isLoading: false,
  block: types.optional(Block, {
    id: "0",
    name: "",
    variety: "",
    statePostalCode: "",
    stationID: ""
  }),
  blockStore: types.optional(BlockStore, {}),
  view: types.optional(ViewStore, {})
});

import { types } from "mobx-state-tree";

export const ViewStore = types
  .model("ViewStore", {
    isLoading: false,
    isInfo: false,
    isAddBlock: false,
    isBlockList: false
  })
  .actions(self => ({
    toggleInfo() {
      self.isInfo = !self.isInfo;
    },
    openIsBlockList() {
      self.isBlockList = true;
    },
    openIsAddBlock() {
      self.isAddBlock = true;
    },
    closeIsAddBlock() {
      self.isAddBlock = false;
    }
  }));

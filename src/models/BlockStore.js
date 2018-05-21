import { types, getSnapshot, applySnapshot, getParent } from "mobx-state-tree";
import { when, reaction } from "mobx";

export const Block = types
  .model("Block", {
    name: types.string,
    variety: types.string,
    statePostalCode: types.string,
    stationID: types.string
  })
  .actions(self => ({
    setField(name, e) {
      return e ? (self[name] = e.target.value) : null;
    }
  }));

const b1 = Block.create({
  variety: "Gala",
  name: "Field 256",
  statePostalCode: "NY",
  stationID: "alb"
});
const b2 = Block.create({
  variety: "Golden Delicious",
  name: "Field 333",
  statePostalCode: "NJ",
  stationID: "tanu"
});

export const BlockStore = types
  .model("BlockStore", {
    blocks: types.optional(types.array(Block), [b1, b2])
  })
  .views(self => ({
    get rootStore() {
      return getParent(self);
    }
  }))
  .actions(self => ({
    add(block) {
      self.blocks.push(block);
    },
    afterAttach() {
      if (typeof window !== "undefined" && window.localStorage) {
        when(
          () => !self.rootStore.isLoading,
          () => {
            self.readFromLocalStorage();
            reaction(
              () => getSnapshot(self),
              json => {
                window.localStorage.setItem("ptgm", JSON.stringify(json));
              }
            );
          }
        );
      }
    },
    readFromLocalStorage() {
      const blocks = window.localStorage.getItem("ptgm");
      if (blocks) applySnapshot(self, JSON.parse(blocks));
    }
  }));

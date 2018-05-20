import { decorate, observable, action, computed, reaction } from "mobx";
import BlockModel from "./BlockModel";

export default class BlocksStore {
  block;
  constructor(states, stations) {
    this.block = new BlockModel(states, stations, this.blocks);
    reaction(() => this.block, () => console.log(this.block));
  }

  blocks = [];
  setBlocks = d => (this.blocks = d);

  newBlock = () => {
    this.blocks.push(this.block);
    this.block.cleanFields();
  };
}

decorate(BlocksStore, {
  block: observable,
  blocks: observable,
  setBlocks: action,
  newBlock: action
});

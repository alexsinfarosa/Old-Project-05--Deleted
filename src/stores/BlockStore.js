import { decorate, observable, action, computed } from "mobx";

import Block from "./Block";

export default class BlocksStore {
  isLoading = false;
  blocks = [];

  createBlock() {
    const block = new Block(this);
    this.blocks.push(block);
    return block;
  }
}

decorate(BlocksStore, {
  isLoading: observable,
  blocks: observable
});

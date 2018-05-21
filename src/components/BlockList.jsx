import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// component
import Block from "./Block";

const styles = theme => ({
  root: {}
});

class BlockList extends Component {
  render() {
    // const { classes } = this.props;
    const { blocks } = this.props.app.blockStore;

    return <div>{blocks.map(bl => <Block key={bl.name} bl={bl} />)}</div>;
  }
}

export default withRoot(withStyles(styles)(inject("app")(observer(BlockList))));

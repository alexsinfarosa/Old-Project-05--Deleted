import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

class Block extends Component {
  render() {
    const { bl, classes } = this.props;
    return (
      <div key={bl.name} className={classes.root}>
        <li>{bl.name}</li>
        <li>{bl.variety}</li>
        <li>{bl.statePostalCode}</li>
        <li>{bl.stationID}</li>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(inject("app")(observer(Block))));

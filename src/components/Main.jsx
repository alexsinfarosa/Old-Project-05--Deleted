import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// components
import TopControlBar from "./TopControlBar";

// components
import BlockList from "./BlockList";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flex: 1,
    padding: theme.spacing.unit * 2
  }
});

class Main extends Component {
  render() {
    const { classes } = this.props;
    const { isBlockList } = this.props.app.view;

    return (
      <div className={classes.root}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <TopControlBar />
          {isBlockList ? (
            <BlockList />
          ) : (
            <Typography>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum,
              voluptatem culpa. Dolore, dicta a suscipit provident aliquam
              labore architecto odio minima voluptatibus error aspernatur ipsum
              nemo. Excepturi optio perferendis suscipit.
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(inject("app")(observer(Main))));

import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import compose from "recompose/compose";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

const styles = theme => ({
  root: {
    // flexGrow: 1,
    background: theme.palette.primary.main,
    marginBottom: theme.spacing.unit * 4
  }
});

class AppHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Hidden smUp>
              <Typography variant="subheading" style={{ color: "#fff" }}>
                Pollen Tube Growth Model Developed By Virginia Tech
              </Typography>
            </Hidden>

            <Hidden only="xs">
              <Typography variant="title" style={{ color: "#fff" }}>
                Pollen Tube Growth Model Developed By Virginia Tech
              </Typography>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withRoot(
  compose(withStyles(styles), withWidth())(inject("app")(observer(AppHeader)))
);

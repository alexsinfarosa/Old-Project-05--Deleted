import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

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
          <Hidden only="xs">
            <Toolbar>
              <Typography variant="title" style={{ color: "#fff", flex: 1 }}>
                Pollen Tube Growth Model Developed By Virginia Tech
              </Typography>
            </Toolbar>
          </Hidden>

          <Hidden smUp>
            <Toolbar>
              <Typography
                variant="title"
                style={{ color: "#fff", flex: 1, fontSize: "1.2rem" }}
              >
                Pollen Tube Growth Model Developed By Virginia Tech
              </Typography>
            </Toolbar>
          </Hidden>
        </AppBar>
      </div>
    );
  }
}
export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(AppHeader)))
);

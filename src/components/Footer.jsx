import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  footer: {
    display: "flex",
    // width: "100%",
    height: "10vh",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: theme.spacing.unit * 4,
    borderTop: "1px solid #E7E7E7"
  },
  button: {
    color: "#6C6E70",
    fontSize: "0.9rem",
    letterSpacing: 1
  }
});
class Footer extends Component {
  render() {
    const { classes } = this.props;
    const { isInfo, toggleInfo } = this.props.rootStore;
    return (
      <Fragment>
        <Typography variant="caption" className={classes.footer}>
          <Button
            className={classes.button}
            onClick={isInfo ? null : toggleInfo}
          >
            MORE INFO
          </Button>
          <Button
            className={classes.button}
            href="http://newa.cornell.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NEWA
          </Button>
        </Typography>
      </Fragment>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(Footer)))
);

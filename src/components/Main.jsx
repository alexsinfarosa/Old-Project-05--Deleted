import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: 1200,
    margin: "0 auto",
    padding: theme.spacing.unit * 2
  }
});

class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          dolores porro obcaecati maiores incidunt delectus eius omnis, debitis
          saepe necessitatibus commodi, ad laboriosam nisi dolore, totam numquam
          unde nulla quod?
        </Typography>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(Main)))
);

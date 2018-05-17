import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: 700,
    margin: "0 auto",
    padding: theme.spacing.unit * 2
  }
});

class Instructions extends Component {
  render() {
    const { classes } = this.props;
    const { toggleInfo } = this.props.rootStore;
    return (
      <div className={classes.root}>
        <IconButton
          onClick={toggleInfo}
          aria-label="go back"
          style={{ marginBottom: 32 }}
        >
          <KeyboardBackspace />
        </IconButton>

        <Typography variant="body1" paragraph align="justify">
          <b>The pollen tube growth model (PTGM)</b> was developed at Virginia
          Tech. It is based on apple pollen tubes growth rates that were
          empirically derived under controlled temperature conditions. Model
          validation has been conducted in Washington, Virginia, and New York
          orchards.
        </Typography>

        <Typography variant="body1" paragraph align="justify">
          The PTGM begins when the desired number of king bloom flowers are in
          full bloom (that is, when the petals no longer cover the reproductive
          organs thus allowing for cross-pollination). The desired number of
          open king bloom flowers is equal to the desired crop load and is
          determined by counting the number of open king bloom flowers per tree
          or by visual assessment of full bloom density in the orchard. Average
          style length is measured at this time and is used as a variable in the
          model.
        </Typography>

        <Typography variant="body1" paragraph align="justify">
          Hourly temperatures recorded in or near the orchard are used with the
          pollen tube growth rate equations to calculate cumulative pollen tube
          growth. Chemical bloom thinning applications are made when the pollen
          tube lengths are equivalent to average style length. The supposition
          is that fertilization has occurred at this point.
        </Typography>

        <Typography variant="body1" paragraph align="justify">
          Assuming that pollen tubes must grow the entire average style length
          on flowers that reached full bloom after an application of a bloom
          thinner, the model is reset after the bloom thinning application is
          made. Additional bloom thinning applications occur before pollen tubes
          grow to the end of the style to prevent additional fertilization.
          Applications cease at the end of bloom. Typically, two chemical
          thinning applications are necessary each year. Occasionally, a third
          application is necessary.
        </Typography>

        <Typography variant="headline" paragraph align="justify">
          References
        </Typography>

        <Typography variant="body1" paragraph align="justify">
          Yoder, K.S., G.M. Peck, L.D. Combs, and R.E. Byers. 2013. Using a
          pollen tube growth model to improve bloom thinning for organic
          production. Acta Horticulturae 1001:207-214.
          <Typography variant="caption">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://doi.org/10.17660/ActaHortic.2013.1001.23"
            >
              https://doi.org/10.17660/ActaHortic.2013.1001.23
            </a>
          </Typography>
        </Typography>

        <Typography variant="body1" paragraph align="justify">
          Peck, G.M., L.D. Combs, C. DeLong, and K.S. Yoder. 2016. Precision
          Apple Flower Thinning using Organically Approved Chemicals. Acta
          Horticulturae 1137:47-52.
          <Typography variant="caption">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href=" https://doi.org/10.17660/ActaHortic.2016.1137.7"
            >
              {" "}
              https://doi.org/10.17660/ActaHortic.2016.1137.7
            </a>
          </Typography>
        </Typography>

        <Typography variant="body1" paragraph align="justify">
          Peck,G.M., C.N. DeLong, L. Combs, and K.S. Yoder. 2017. Managing Apple
          Crop Load and Diseases with Bloom Thinning Applications in an
          Organically Managed ‘Honeycrisp’/‘MM.111’ Orchard. HortScience
          (523)-377–381.
          <Typography variant="caption">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://doi.org/10.21273/HORTSCI11412-16"
            >
              https://doi.org/10.21273/HORTSCI11412-16
            </a>
          </Typography>
        </Typography>
      </div>
    );
  }
}

export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(Instructions)))
);

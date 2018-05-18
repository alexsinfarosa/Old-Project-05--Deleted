import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    minWidth: 120
  }
});

class TopControlBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="outlined" color="primary" className={classes.button}>
          ADD BLOCK
        </Button>

        <form autoComplete="off" className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="blockList">Select Block</InputLabel>
            <Select
              value={10}
              // style={{ width: 200 }}
              // onChange={this.handleChange}
              inputProps={{
                name: "blockList",
                id: "blockList"
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
        </form>

        <Badge color="primary" badgeContent={4} className={classes.button}>
          <Button variant="outlined" color="primary">
            BLOCK LIST
          </Button>
        </Badge>
      </div>
    );
  }
}
export default withRoot(
  withStyles(styles)(inject("rootStore")(observer(TopControlBar)))
);

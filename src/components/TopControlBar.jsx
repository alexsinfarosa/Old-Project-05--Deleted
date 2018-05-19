import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import Badge from "@material-ui/core/Badge";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import compose from "recompose/compose";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

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
  buttonMobile: {
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
    const { openIsAddBlock } = this.props.rootStore;
    return (
      <div className={classes.root}>
        <Hidden smUp>
          <form autoComplete="off" className={classes.form}>
            <FormControl
              className={classes.formControl}
              style={{ marginLeft: 0 }}
            >
              <InputLabel htmlFor="blockList">Select Block</InputLabel>
              <NativeSelect
                value={undefined}
                // style={{ width: 200 }}
                // onChange={this.handleChange}
                inputProps={{
                  name: "blockList",
                  id: "blockList"
                }}
              >
                <option value="" />
                <option value={10}>Apple field 458H</option>
              </NativeSelect>
            </FormControl>
          </form>

          <div>
            <Button
              variant="fab"
              color="primary"
              aria-label="add"
              className={classes.buttonMobile}
              onClick={openIsAddBlock}
            >
              <AddIcon />
            </Button>

            <Button
              variant="fab"
              color="primary"
              aria-label="add"
              className={classes.buttonMobile}
            >
              <ListIcon />
            </Button>
          </div>
        </Hidden>

        <Hidden only="xs">
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={openIsAddBlock}
          >
            ADD BLOCK
          </Button>

          <form autoComplete="off" className={classes.form}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="blockList">Block</InputLabel>
              <NativeSelect
                value={undefined}
                // onChange={this.handleChange}
                input={<Input id="blockList" />}
              >
                <option value="" />
                <option value={10}>Apple field 458H</option>
              </NativeSelect>
            </FormControl>
          </form>

          <Badge color="primary" badgeContent={4} className={classes.button}>
            <Button variant="outlined" color="primary">
              BLOCK LIST
            </Button>
          </Badge>
        </Hidden>
      </div>
    );
  }
}
export default withRoot(
  compose(withStyles(styles), withWidth())(
    inject("rootStore")(observer(TopControlBar))
  )
);

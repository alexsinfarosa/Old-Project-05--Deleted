import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Block } from "../models/BlockStore";

// data
import { growthRates } from "../assets/growthRates";
import { allStates } from "../assets/allStates";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const styles = theme => ({
  container: {
    display: "flex",
    width: theme.spacing.unit * 45,
    flexDirection: "column",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
    minWidth: 150
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class AddBlockModal extends Component {
  state = {
    block: Block.create({
      name: "",
      variety: "",
      statePostalCode: "",
      stationID: ""
    })
  };

  onAdd = () => {
    this.props.app.blockStore.add(this.state.block);
    this.props.app.view.closeIsAddBlock();
  };

  render() {
    const { classes, fullScreen } = this.props;
    const { isAddBlock, closeIsAddBlock } = this.props.app.view;
    const { block } = this.state;
    console.log(this.props);
    console.log(block);

    const varietyList = growthRates.map(variety => (
      <option key={variety.name} value={variety.name}>
        {variety.name}
      </option>
    ));

    const stateList = Object.keys(allStates)
      .map(id => allStates[id])
      .map(state => (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      ));

    // const stationList = currentStateStations.map(stn => (
    //   <option key={stn.id} value={stn.id}>
    //     {stn.name}
    //   </option>
    // ));

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen={fullScreen}
          open={isAddBlock}
          onClose={closeIsAddBlock}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"New block"}</DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <form className={classes.container} noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  label="Name"
                  placeholder="min. 3 letters"
                  className={classes.textField}
                  margin="normal"
                  // value={block.name}
                  onChange={e => block.setField("name", e)}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="variety">Variety</InputLabel>
                <NativeSelect
                  // value={block.variety}
                  onChange={e => block.setField("variety", e)}
                  input={<Input id="variety" />}
                >
                  <option value="" />
                  {varietyList}
                </NativeSelect>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="statePostalCode">State</InputLabel>
                <NativeSelect
                  value={block.statePostalCode}
                  onChange={e => block.setField("statePostalCode", e)}
                  input={<Input id="statePostalCode" />}
                >
                  <option value="" />
                  {stateList}
                </NativeSelect>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="stationID">
                  Station{" "}
                  {/**currentStateStations.length !== 0
                    ? `(${currentStateStations.length})`
                  : ""**/}
                </InputLabel>
                <NativeSelect
                  value={block.stationID}
                  onChange={e => block.setField("stationID", e)}
                  input={<Input id="stationID" />}
                >
                  <option value="" />
                </NativeSelect>
              </FormControl>
            </form>
          </DialogContent>

          <DialogActions>
            <Button
              style={{ marginBottom: 16 }}
              onClick={closeIsAddBlock}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              style={{ marginBottom: 16 }}
              onClick={this.onAdd}
              color="primary"
              autoFocus
            >
              Create Block
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withRoot(
  withStyles(styles)(inject("app")(withMobileDialog()(observer(AddBlockModal))))
);

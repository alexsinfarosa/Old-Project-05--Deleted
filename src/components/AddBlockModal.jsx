import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// data
import { growthRates } from "../assets/growthRates";

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
  render() {
    const { classes, fullScreen } = this.props;
    const { isAddBlock, closeIsAddBlock } = this.props.rootStore;

    const {
      name,
      varietyName,
      statePostalCode,
      states,
      stationID,
      currentStateStations,
      setField
    } = this.props.rootStore.blocksStore.block;

    const varietyList = growthRates.map(variety => (
      <option key={variety.name} value={variety.name}>
        {variety.name}
      </option>
    ));

    const stateList = states.map(state => (
      <option key={state.id} value={state.id}>
        {state.name}
      </option>
    ));

    const stationList = currentStateStations.map(stn => (
      <option key={stn.id} value={stn.id}>
        {stn.name}
      </option>
    ));

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
                  // value={name}
                  onChange={setField("name")}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="varietyName">Variety</InputLabel>
                <NativeSelect
                  value={varietyName}
                  onChange={setField("varietyName")}
                  input={<Input id="varietyName" />}
                >
                  <option value="" />
                  {varietyList}
                </NativeSelect>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="statePostalCode">State</InputLabel>
                <NativeSelect
                  value={statePostalCode}
                  onChange={setField("statePostalCode")}
                  input={<Input id="statePostalCode" />}
                >
                  <option value="" />
                  {stateList}
                </NativeSelect>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="station">
                  Station{" "}
                  {currentStateStations.length !== 0
                    ? `(${currentStateStations.length})`
                    : ""}
                </InputLabel>
                <NativeSelect
                  value={stationID}
                  onChange={setField("stationID")}
                  input={<Input id="station" />}
                >
                  <option value="" />
                  {stationList}
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
              onClick={() => {
                console.log("create block");
                this.props.rootStore.blocksStore.block.addBlock();
                closeIsAddBlock();
              }}
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
  withStyles(styles)(
    inject("rootStore")(withMobileDialog()(observer(AddBlockModal)))
  )
);

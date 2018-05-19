import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

// import Typography from "@material-ui/core/Typography";
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
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="variety">Variety</InputLabel>
                <NativeSelect
                  value={undefined}
                  // onChange={this.handleChange("age")}
                  input={<Input id="variety" />}
                >
                  <option value="" />
                  <option value={10}>Golden Delicious</option>
                </NativeSelect>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="state">State</InputLabel>
                <NativeSelect
                  value={undefined}
                  // onChange={this.handleChange("age")}
                  input={<Input id="state" />}
                >
                  <option value="" />
                  <option value={10}>New York</option>
                </NativeSelect>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="station">Station</InputLabel>
                <NativeSelect
                  value={undefined}
                  // onChange={this.handleChange("age")}
                  input={<Input id="station" />}
                >
                  <option value="" />
                  <option value={10}>Accord</option>
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
    inject("rootStore")(observer(withMobileDialog()(AddBlockModal)))
  )
);

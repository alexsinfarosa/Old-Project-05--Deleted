import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";

// components
import AppHeader from "./components/AppHeader";
import Footer from "./components/Footer";
import Instructions from "./components/Instructions";
import Main from "./components/Main";

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;
    const { data, isInfo } = this.props.rootStore.paramsStore;
    return (
      <div className={classes.root}>
        <AppHeader />

        {isInfo ? <Instructions /> : <Main />}

        <Footer />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(inject("rootStore")(observer(App))));

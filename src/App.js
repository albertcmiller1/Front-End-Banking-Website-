import React from "react";

import FrontPage from "./js/components/Pages/FrontPage";

const TechUrl = `http://technivationtestapi.azurewebsites.net/api/accounts`;

export default class App extends React.Component {
  state = {
    accounts: [],
    currentAccount: null,
    currentEnrollment: ""
  };

  componentDidMount() {
    var api = fetch(TechUrl);

    api
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response;
      })
      .then(d => d.json())
      .then(
        d => {
          this.setState({
            accounts: d
          });
        },
        () => {
          this.setState({
            requestFailed: true
          });
        }
      );
  }

  setCurrentAccount = currentAccount => {
    console.log("current account", currentAccount);
    this.setState({ currentAccount });
  };

  render() {
    return (
      <div>
        <FrontPage
          ApiData={this.state.accounts}
          setCurrentAccount={this.setCurrentAccount}
          account={this.state.currentAccount}
        />
      </div>
    );
  }
}

import React from "react";
import GenAccount from "./GenAccount";

export default class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);

    this.state = {
      collapsed: true
    };
  }

  toggleNav() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className="HomePageS">
        <div className="Fullheader">
          <div class="Jumbotron jumbotron-fluid">
            <div class="container">
              <h2 class="display-4">AFS</h2>
              <p class="lead">Albert's Financial Solutions</p>
            </div>
          </div>
        </div>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a
            class="navbar-brand"
            onClick={() => this.props.setCurrentAccount(null)}
            href="#"
            onClick={this.toggleNav}
          >
            Home
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Activity<span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Transfer
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Bill Pay
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Accounts
                </a>

                <div>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {" "}
                    {this.props.ApiData.map(account => (
                      <a
                        to={{
                          pathname: "/GenAccount",
                          state: { account: account }
                        }}
                        href="#"
                        key={account.number}
                        onClick={() => this.props.setCurrentAccount(account)}
                        class="dropdown-item"
                      >
                        {account.maskedNumber}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          {this.props.account ? (
            <GenAccount account={this.props.account} />
          ) : (
            <table className="Dynamic data table" class="table table-hover">
              <thead>
                <tr>
                  <th id="BSacctType" scope="col">
                    Account
                  </th>
                  <th id="BSacctType" scope="col">
                    Account Type
                  </th>
                  <th id="BSacctNick" scope="col">
                    Account Nickname
                  </th>
                  <th id="BScurBal" scope="col">
                    Current Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.ApiData.map(account => (
                  <tr
                    to={{
                      pathname: "/GenAccount",
                      state: { account: account }
                    }}
                    key={account.number}
                    onClick={() => this.props.setCurrentAccount(account)}
                  >
                    <td scope="col">{account.maskedNumber}</td>
                    <td>{account.accountType}</td>
                    <td>{account.nickname}</td>
                    <td>{account.formattedCurrentBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

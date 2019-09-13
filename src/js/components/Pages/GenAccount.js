import React from "react";

export default class GenAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Enrollment: props.account.isEnrolledInRewards,
      RedeemAmount: "",
      RewardsBalance: props.account.rewardsPoints
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.loadAccount(props.account);
  }

  loadAccount(accountX) {
    this.setState({
      Enrollment: accountX.isEnrolledInRewards,
      RedeemAmount: "",
      RewardsBalance: accountX.rewardsPoints
    });
  }

  //.........Enrollment Stuff..........
  EnrollURL = `http://technivationtestapi.azurewebsites.net/api/${
    this.props.account.number
  }/enroll`;
  Enroll() {
    fetch(this.EnrollURL, { method: "POST" })
      .then(() => {
        this.setState({ Enrollment: true });
      })
      .catch(err => {
        alert("help " + err);
      });
  }

  //..........Redeem Points Stuff.........
  handleChange(e) {
    this.setState({ RedeemAmount: e.target.value });
  }

  handleSubmit(eve) {
    eve.preventDefault();
  }

  Redeem() {
    const RedeemURL = `http://technivationtestapi.azurewebsites.net/api/${
      this.props.account.number
    }/redeem`;

    fetch(RedeemURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ redeemAmount: this.state.RedeemAmount })
    })
      .then(res => {
        return res.json();
      })
      .then(r2 => {
        console.log("result: ", r2);
        this.setState({ RewardsBalance: r2 });
        console.log("Rewards balance: ", r2);
      })
      .then(() => {
        this.setState({ RedeemAmount: "" });
      });
  }
  //.................................................................

  render() {
    let RewardsEligible = this.props.account.isEligibleForRewards;
    let RewardsEnrolled = this.state.Enrollment;

    var GenAcc = (
      <div class="Account Info" class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Account Information</h5>
            <p class="card-text">
              Account Nickname: {this.props.account.nickname}
            </p>
            <p class="card-text">
              Account Type: {this.props.account.accountType}
            </p>
            <p class="card-text">Account Number: {this.props.account.number}</p>
            <p class="card-text">
              Currenet Balance: {this.props.account.formattedCurrentBalance}
            </p>
          </div>
        </div>
      </div>
    );

    var CanEnroll = (
      <div class="col-sm-6">
        <div className="CanEnroll" class="card">
          <div class="card-body">
            <h5 class="card-title">Congratulations!</h5>
            <p class="card-text">
              You are eligible for our Cash Back rewards program.
            </p>
            <a onClick={this.Enroll.bind(this)} class="btn btn-primary">
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    );

    var NotEligible = (
      <div class="col-sm-6">
        <div className="CanEnroll" class="card">
          <div class="card-body">
            <h5 class="card-title">We're Sorry...</h5>
            <p class="card-text">
              You are not eligible for our Cash Back rewards program at this
              time.
            </p>
            <a href="#" class="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    );
    //...............................................................................
    var CanRedeem = (
      <div className="AlreadyEnrolled" class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Your Rewards</h5>

            {this.state.RewardsBalance ? (
              <p>
                You have {this.state.RewardsBalance} points in your account.
                Redeem as many as you'd like here!
              </p>
            ) : (
              <p>
                {" "}
                You don't have any points in your account right now. Come back
                soon!
              </p>
            )}

            <form onSubmit={this.handleSubmit} class="input-group mb-3">
              <input
                value={this.state.RedeemAmount}
                onChange={this.handleChange}
                type="text"
                class="form-control"
                placeholder="Enter Amount"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button
                  onClick={this.Redeem.bind(this)}
                  class="btn btn-outline-secondary"
                  type="button"
                >
                  Redeem Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    //......................................................................................

    if (RewardsEligible && RewardsEnrolled) {
      return (
        <div class="Boot Cards" class="row">
          {GenAcc}
          {CanRedeem}
        </div>
      );
    } else if (RewardsEligible && !RewardsEnrolled) {
      return (
        <div class="Boot Cards" class="row">
          {GenAcc}
          {CanEnroll}
        </div>
      );
    } else if (!RewardsEligible && !RewardsEnrolled) {
      return (
        <div class="Boot Cards" class="row">
          {GenAcc}
          {NotEligible}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

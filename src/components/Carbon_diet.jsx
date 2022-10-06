import React, { Component } from "react";

class Carbon_diet extends Component {
  state = {
    count: 0,
    out: "HI",
    // imageUrl: "https://picsum.photos/200",
    climatiq: "https://beta3.api.climatiq.io&key=Y4PWG9Q2WA4QP5P3YDAZZVQF0NBX",
    tags: ["tag1", "tag2", "tag3"],
  };

  constructor() {
    super();
    this.handleIncrement = this.handleIncrement.bind(this);
    this.climatiqGet = this.climatiqGet.bind(this);
  }

  style = {
    fontSize: 10,
    fontWeight: "bold",
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  handleIncrement() {
    this.state.count = this.state.count + 1;
    this.setState({ count: this.state.count });
  }

  async climatiqGet() {
    const data = {
      emission_factor: {
        activity_id: "heat-and-steam-type_purchased",
      },
      parameters: {
        energy: 100,
        energy_unit: "kWh",
      },
    };

    // fetch from climatic using the key Y4PWG9Q2WA4QP5P3YDAZZVQF0NBX
    const response = await fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + "Y4PWG9Q2WA4QP5P3YDAZZVQF0NBX",
      },
      body: JSON.stringify(data),
    });

    let json = await response.json();
    console.log(json.co2e);
    // this.state.out = JSON.stringify(json.results[0].activity_id);
    this.state.out = JSON.stringify(json);
    this.setState({ out: this.state.out });
  }

  render() {
    return (
      <React.Fragment>
        {/* <img src={this.state.imageUrl} alt="" /> */}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        {this.state.tags.length === 0 && "Please create a new tag!"}
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>

        {/* {this.renderTags()} */}

        <button onClick={this.climatiqGet}> GET</button>

        <span>
          {" "}
          <p>{this.state.out}</p>{" "}
        </span>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.state.count == 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    const zero = <h1>Zero</h1>;
    return count == 0 ? "Zero" : count;
  }
}

export default Carbon_diet;

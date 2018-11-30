import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import "./styles.css";

class ToDoApp extends React.Component {
  constructor(props) {
    super();
    this.state = { list: props.list, change: "false" };
    this.newItem = React.createRef();
    console.clear();
    console.log(
      "Constructor for ToDo app completed and the list is initialised as..." +
        JSON.stringify(this.state.list)
    );
  }

  render() {
    return (
      <div className="App widget">
        <ul id="list">
          {" "}
          <li className="header"><h3>ToDo App </h3></li>
          <li className="mainsmall">
            <input ref={this.newItem} />{" "}
          </li>
          <li className="button add">
            <button onClick={this.add}>Add</button>
          </li>
          <li className="button reset">
            <button onClick={this.reset}>Reset</button>
          </li>
          {this.state.list.map((value, i) => {
            return <ToDoList key={i} i={i} item={value} remove={this.remove} />;
          })}
        </ul>
      </div>
    );
  }

  add = () => {
    //  let newItem =this.refs.newItem.value;
    let newItem = this.newItem.current["value"];

    this.setState({ list: [...this.state.list, newItem] });
    console.log("\n ***Add Button Pressed... **");
    console.log(
      "Add handler will pull value from the input field and set the new state for ToDO app"
    );
    console.log(
      "Tip : You can use React.createRef() to reference Virtual DOM elements.  "
    );
  };

  reset = () => {
    //  let newItem =this.refs.newItem.value;
    console.log("\n ***Reset Button Pressed... **");
    console.log(
      "Reset handler will reset list to default values..." +
        JSON.stringify(ToDoApp.defaultProps.list)
    );

    this.setState({ list: [...ToDoApp.defaultProps.list] });
  };

  remove = e => {
    //  let newItem =this.refs.newItem.value;

    var array = [...this.state.list]; // make a separate copy of the array
    var index = e.target.id;
    array.splice(index, 1);
    this.setState({ list: array });

    // this.setState({ list: ["item10", "item20"] });
  };
}

ToDoApp.propTypes = {
  list: PropTypes.array
};

ToDoApp.defaultProps = {
  list: ["Get up in the morning", "Brush my teeth"]
};

class ToDoList extends React.Component {
  constructor(props) {
    super();
    this.state = { value: props.item };
    console.log(
      "Constructor for ToDoList completed and the item value is initialised as..." +
        JSON.stringify(this.state)
    );
    console.log('-- ToDoList will RENDER..."' + this.state.value + '" to list');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item != this.props.item)
      this.setState({ ...this.state, value: nextProps.item });
    console.log(
      '-- ToDoList HOOK detetected property change..."' +
        nextProps.item +
        "--" +
        this.props.item
    );
  }

  render() {
    /** RENDER  **/
    console.log("-- render");
    return (
      <li className="main">
        {this.state.value}
        <button className='remove'  id={this.props.i} onClick={this.props.remove}>
          Remove
        </button>
      </li>
    );
  }

  componentWillUnmount() {
    console.log(
      "-- ToDoList will unmount and  delete item .." + this.state.value
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ToDoApp />, rootElement);

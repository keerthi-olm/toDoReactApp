import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import "./styles.css";

class ToDoApp extends React.Component {
  constructor(props) {
    super();
    this.state = { list: props.list, change: "false" , doneList:props.doneList };
    this.newItem = React.createRef();
    this.doneList=[...props.doneList];
    this.list=[...this.state.list];
    console.clear();
    console.log(
      "ToDoApp-> Constructor :  list is initialised as..." +
        JSON.stringify(this.list)
    );
  }

componentWillUpdate(nextProps, nextState) {
   console.log('will update');
       this.doneList=[];
    this.list=[...nextState.list];
    console.log(this.list);
}

  render() {
    return (
      <div className="App widget">
        <ul id="list">
          <li className="header"><h2>My to do list </h2></li>
          <li className="mainsmall">
            <input ref={this.newItem} placeholder="Add a new task..."/>
          </li>
          <li className="button add">
            <button onClick={this.add}>Add</button>
          </li>
          <li className="button reset">
            <button onClick={this.reset}>Reset</button>
          </li>
          {this.state.list.map((value, i) => {
            return <ToDoList key={i} i={i} item={value} remove={this.remove} removeItem={this.removeItem}/>;
          })}
          <li className="footer"><button className='remove'  onClick={this.remove}>
          Remove
        </button></li>
        </ul>
      </div>
    );
  }

  add = () => {
    //  let newItem =this.refs.newItem.value;
    let newItem = this.newItem.current["value"];
    if (newItem!=='') {
        this.setState({ list: [...this.state.list, newItem] });
        this.newItem.current["value"]='';
        // this.doneList[this.state.list.length]=false;
        console.log(this.doneList);

        console.log("\n ***Add Button Pressed... **");
        console.log(
          "Add handler will pull value from the input field and set the new state for ToDO app"
        );
        console.log(
          "Tip : You can use React.createRef() to reference Virtual DOM elements.  ");
     }


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


this.doneList.sort((a, b) => a - b);
console.log(this.doneList);
    for (var i = this.doneList.length -1; i >= 0; i--)
       this.list.splice(this.doneList[i],1);

 this.setState({ list: [...this.list] });

   console.log(this.list);
   this.doneList=[];

  };
  removeItem = id => {


      let f = this.doneList.filter(function (val) {
          return (val === id);
      });

      if (f===undefined || f.length===0) {
      // add to list
      this.doneList.push(id);
      } else {
      //delete from list
      this.doneList= this.doneList.filter(function (val) {
          return (val !== id);
      });
      }
           console.log('donelist afterremove-->');
           console.log(this.doneList);

  };

}

ToDoApp.propTypes = {
  list: PropTypes.array
};

ToDoApp.defaultProps = {
  list: ["Get up in the morning", "Brush my teeth"],
  doneList: []
};

class ToDoList extends React.Component {
  constructor(props) {
    super();
    this.state = { value: props.item , checked:false};
    console.log(
      "ToDoList->Constructor : item value is initialised as..." +
        JSON.stringify(this.state)
    );
    console.log('-- ToDoList will RENDER..."' + this.state.value + '" to list');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item)
      this.setState({ ...this.state, value: nextProps.item , checked:false});
    console.log(
      'ToDoList -> componentWillReceiveProps : detected property change..."' +
        nextProps.item +
        "--" +
        this.props.item
    );
  }
  handleClick = (e) => {
    this.setState({
      checked: !this.state.checked
    });
   this.props.removeItem(e.target.id);
  }

  render() {
    /** RENDER  **/
    console.log("-- render");
    
    let text = this.state.checked ? <strike>{this.state.value}</strike> : this.state.value;
    let checked= this.state.checked ? 'checked' : '';
    return (
      <li className="main">
        <input className='checkbox' type="checkbox" onClick={this.handleClick} id={this.props.i} checked={checked} />{text}
      </li>
    );
  }

  componentWillUnmount() {
    console.log(
      "ToDoList -> componentWillUnmount :  unmount and  delete item .." + this.state.value
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ToDoApp />, rootElement);

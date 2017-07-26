import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

const numbers = [1, 2, 3, 4, 5];

class NumberList extends Component {
	
	render(){
		const numbers = this.props.numbers;
  		const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    	<ListItem key={number.toString()}
              value={number} />
  		);
		return (
			<ul>
      			{listItems}
    		</ul>
			);
	}
}

class ListItem extends Component {
	render(){
		return(
				<li><div className="box"><button className="btn btn-primary">{this.props.value}</button></div></li>
			);
	}
}


class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: false,
			date: new Date()
		};

		//this.handleClick = this.handleClick.bind(this);
	}

	

	componentDidMount(){

		this.timerID = setInterval(
			() => this.tick(), 
			1000
			);
	}

	componentWillUnmount(){

		clearInterval(this.timerID);

	}

	tick(){
		this.setState({
			date: new Date()
		});
	}

	handleClick(){
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	authButton(){

		const { authenticated, authenticate } = this.props;

		return (
				<button onClick={() => authenticated ? authenticate(false) : authenticate(true)}>{authenticated ? 'Sign Out': 'Sign In'}</button>
			)
	}

	ActionLink() {
  		function handleClick(e) {
    		e.preventDefault();
    		console.log('The link was clicked.');
  	}

  		return (
    		<a href="#" onClick={handleClick}>
      		Click me
    		</a>
  		);
	}



	render(){
		return (
			<div>
				<nav className="navbar navbar-light">
					<ul className="nav navbar-nav">
						<li className="nav-item">{this.ActionLink()}</li>

						<li className="nav-item">
							<Link to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/resources">Resources</Link>
						</li>
						<li className="nav-item">
							{this.authButton()}
						</li>
						<li className="nav-item right">
							<div>Time is: {this.state.date.toLocaleTimeString()}</div>
						</li>
						
					</ul>
					

				</nav>
				<NumberList numbers={numbers} />
				
			</div>
			);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
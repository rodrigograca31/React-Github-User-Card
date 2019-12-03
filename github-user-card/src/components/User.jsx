import React from "react";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
	"token " + process.env.REACT_APP_TOKEN;

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 0,
			user: {}
		};
	}

	componentDidMount() {
		console.log("1");
		this.setState({
			test: 2
		});

		axios
			.get("https://api.github.com/users/rodrigograca31")
			.then(response => {
				this.setState({
					user: response
				});
			})
			.catch(error => {
				console.log("error");
				console.log(error);
			});
	}
	componentDidUpdate() {
		console.log("2");
		console.log(this.state.test);
	}
	render() {
		return JSON.stringify(this.state.user);
		// return "Token: " + process.env.REACT_APP_TOKEN;
	}
}

export default User;

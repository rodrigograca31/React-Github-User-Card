import React from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

axios.defaults.headers.common["Authorization"] =
	"token " + process.env.REACT_APP_TOKEN;

const useStyles = theme => ({
	card: {
		maxWidth: 300,
		margin: "auto",
		transition: "0.3s",
		boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
		}
	},
	media: {
		paddingTop: "56.25%"
	},
	content: {
		textAlign: "left",
		padding: theme.spacing.unit * 3
	},
	divider: {
		margin: `${theme.spacing.unit * 3}px 0`
	},
	heading: {
		fontWeight: "bold"
	},
	subheading: {
		lineHeight: 1.8
	},
	avatar: {
		display: "inline-block",
		border: "2px solid white",
		"&:not(:first-of-type)": {
			marginLeft: -theme.spacing.unit
		}
	}
});

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			test: 0,
			user: {},
			faces: []
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
					user: response.data
				});
				return response.data.followers_url;
			})
			.then(url => {
				return axios.get(url);
			})
			.then(response => {
				console.log("followers array");
				console.log(response.data);
				this.setState({
					faces: response.data
				});
				response.data.forEach(element => {
					// axios
					// 	.get(element.url)
					// 	.then(follower => {
					// 	})
					// 	.catch(error => {
					// 		console.log("errors");
					// 	});
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
		const { classes } = this.props;

		return (
			JSON.stringify(this.state.user) !== "{}" && (
				<Card className="userCard">
					{/* {JSON.stringify(this.state.user)} */}
					<CardMedia
						// style={{ paddingTop: "56.25%" }}
						className={classes.media}
						image={this.state.user.avatar_url}
					/>
					<CardContent>
						<Typography variant={"h6"} gutterBottom>
							{this.state.user.name}
						</Typography>
						<Typography variant={"caption"}>
							{this.state.user.bio}
						</Typography>
						<br />
						<br />
						<Divider light />
						<br />
						{this.state.faces.map(face => (
							<Avatar
								// style={{
								// 	display: "inline-block",
								// 	border: "2px solid white",
								// 	marginLeft: -8
								// }}
								className={classes.avatar}
								key={face.id}
								src={face.avatar_url}
							/>
						))}
					</CardContent>
				</Card>
			)
		);
		// return "Token: " + process.env.REACT_APP_TOKEN;
	}
}

// export default User;

export default withStyles(useStyles)(User);

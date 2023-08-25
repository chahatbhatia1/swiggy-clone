import React from "react";

class UserClass extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            userInfo: {
                name: "Dummy Name",
                location: "Dummy Location",
                avatarUrl: "https://dummy-image.com/avatar.png",
            }
		};
	}

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/chahatbhatia1");
        const json = await data.json();

        console.log(json);

        this.setState({
            userInfo: json
        })
    }

    componentDidUpdate() {
        console.log("componentDidUpdate called");
    }

    componentWillUnmount() {
        console.log("componentWillUnmont called");
    }

	render() {
        console.log("rendered");

		const { name, location, avatar_url } = this.state.userInfo;

		return (
			<div className="user-card">
				<h2>Name : {name}</h2>
				<h3>Location : {location}</h3>
                <img src={avatar_url} alt="github-avatar" />
			</div>
		);
	}
}

export default UserClass;

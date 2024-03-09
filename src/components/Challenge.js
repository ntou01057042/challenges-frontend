import React from "react";
import ChallengesApiClient from "../services/ChallengesApiClient";

class Challenge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            a: 0,
            b: 0,
            message: '',
            user: '',
            answer: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ChallengesApiClient.randomChallenge()
            .then(res => {
                if (res.ok) {
                    res.json().then((challenge) => {
                        this.setState({
                            a: challenge.factorA,
                            b: challenge.factorB,
                        });
                    });
                } else {
                    this.updateMessage('Can\'t reach the server.');
                }
            });
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        ChallengesApiClient.sendAttempt(this.state.user, this.state.a, this.state.b, this.state.answer)
            .then(res => {
                if (res.ok) {
                    res.json().then(attempt => {
                        if (attempt.correct) {
                            this.updateMessage('Congratulations! Your answer is correct.')
                        } else {
                            this.updateMessage('Oops! Your answer ' + attempt.resultAttempt +
                                ' is wrong, but keep playing!');
                        }
                    });
                } else {
                    this.updateMessage('Oops! Something went wrong.');
                }
            });
    }

    updateMessage(msg: string) {
        this.setState({
            message: msg
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Your new challenge is</h3>
                    <h1>{this.state.a} x {this.state.b}</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Your name:
                        <input
                            type="text"
                            maxLength="12"
                            name="user"
                            value={this.state.user}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Your answer:
                        <input
                            type="number"
                            min="0"
                            name="answer"
                            value={this.state.answer}
                            onChange={this.handleChange}
                        />
                    </label>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
                <h4>{this.state.message}</h4>
            </div>
        );
    }
}

export default Challenge;
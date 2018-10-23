import React from "react";
import io from "socket.io-client";
import Scrapper from './Scrapper';

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            usernames: [],
            answer: ''
        };

        this.socket = io('localhost:5000');

        this.addPlayer = ev =>{
            ev.preventDefault();
            this.socket.emit('NEW_PLAYER', {
                player: this.state.username,
                answer: this.state.answer
            });
            this.setState({username: '', answer: ''});
        }

        this.socket.on('RECEIVE_PLAYERS', function(data){
            addPlayers(data);
        });

        const addPlayers = data => {
            console.log(data);
            this.setState({usernames: [...this.state.usernames, data]});
            console.log(this.state.usernames);
        };
    }
    render(){
        return (
            <React.Fragment>
            <div className="container">
                <p>IMDB Trivia Game</p>
                <div>
                    {this.state.usernames.map(username => {
                        return (
                                 <div>{username.player}</div>
                                )
                    })} 
                </div>
                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                <br/>
                <button onClick={this.addPlayer} className="btn btn-primary form-control">Add Player</button>
                </div>
                <div className="container">
                    <Scrapper/>
                </div>
            </React.Fragment>
        );
    }
}

export default Chat;
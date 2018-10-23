import React, { Component } from 'react';

class Scrapper extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          movies: [],
          random: 1,
          inputText: ""
        };
      }
    
      handleClick(){
        const rand  = Math.floor(Math.random() * 250) + 1
        this.setState({ random: rand });
        fetch('/api/topMovies')
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                movies: result.top250Movies[rand]
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      componentDidMount() {
        this.handleClick();
      }

      render() {
        const { error, isLoaded, movies } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        }else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div className="App">
              <header className="App-header">
              <div>
                <button className="btn btn-primary form-control" onClick={this.handleClick.bind(this)}>Pick flick</button>
              </div>
                <div className="App-intro">
                    {movies.title} 
                </div>
                <form>
                  <input type="text" name="answer"/>
                  <input className="btn btn-primary form-control" type="submit" value="Submit"/>
                </form>
              </header>
            </div>
          );
        }
      }
}

export default Scrapper;
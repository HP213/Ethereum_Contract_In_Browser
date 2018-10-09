import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  // constructor(props){
  //   super(props);
  //
  //   this.state = { manager : ' ' };
  // }

  //Same as constructor as above

  state = {
    manager : '',
    players : [],
    balance : '',
    // winplayer : '',
    value : '',
    message :''
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    // const winplayer = await lottery.methods.winplayer().call();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    this.setState({manager, players, balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message : 'Waiting on transaction success.....'});

    await lottery.methods.enter().send({
      from : accounts[0],
      value : web3.utils.toWei(this.state.value, 'ether')
    });

        this.setState({message : 'You Have been Entered'});
        window.location.reload();

  };

  onClick = async () =>{
    const accounts = await web3.eth.getAccounts();

    this.setState({message : 'Just Wait, We are picking up the WINNER'});

    await lottery.methods.pickWinner().send({
      from : accounts[0],
    });

    this.setState({message : 'A Winner has been picked!, Congratulations!'});
    // window.location.reload();
  }

  render() {
    return (
      <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {this.state.manager}
      There are currently {this.state.players.length} people entered
      competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit = {this.onSubmit}>
      <h4>Want to try Your Luck?</h4>
      <div>
        <label>Amount of ether to enter</label>
        <input
          value = {this.state.value}
          onChange = {event => this.setState({value : event.target.value})}
        />
      </div>
      <button>ENTER</button>
      </form>

      <hr />

      <h4>Ready to pick a Winner?</h4>
      <button onClick = {this.onClick}>Pick a Winner!</button>
      <hr />

      <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;

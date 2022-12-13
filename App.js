import React from "react";
import web3 from "./web3";
import lottery from "./TickstSale";

class App extends React.Component {
state={
    manager: '',
    people: [],
    balance: '',
    address: '',
    value: '',
  };
async componentDidMount(){
    const manager= await lottery.methods.manager().call();
    const people=await lottery.methods.getPlayers().call();
    const address=TicketSale.options.address;
    const balance=await web3.eth.getBalance(TicketSale.options.address);
    this.setState({manager, players, balance, address});
  }

  onSubmit= async (event)=> {
    event.preventDefault();

    const accounts=await web3.eth.getAccounts();

    this.setState({message: 'Wait on transaction success ... '})

    await TicksetSale.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    });
    this.setState({message: 'you have been entered!'});
  };

  render(){
   return (
    <><div className="App">
           …
           …
           <form onSubmit={this.onSubmit}>
               <h4> Wanna buy ticket?</h4>
               <div>
                   <label>Number of tickets </label>
                   <input
                       value={this.state.value}
                       onChange={event => this.setState({ value: event.target.value })} />
               </div>
               <button>Enter</button>
               <div>
               </div>
               <div></div>
           </form>
           <hr/>
           <h4>Ready to buy?</h4>
       <hr/><h1>{this.state.message}</h1></div>
      </>
     );
}

onClick = async () => {
      const accounts = await web3.eth.getAccounts();

      this.setState({ message: "Waiting on transaction success..." });

      await TicketSale.methods.pickWinner().send({
        from: accounts[0],
      });
    this.setState({ message: "A winner has been picked!" });
  };
}
export default App;
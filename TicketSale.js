const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('./compile');

let accounts;
let TicketSale;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //console.log(accounts);
  TicketSale = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [100, 1],
    })
    .send({ from: accounts[0], gasPrice: 1500000, gas: 4700000 });
});


describe("TicketSale", () => {
  it("deploys a contract with owner", async () => {
    assert.ok(TicketSale.options.address);
  });
  it("verify purchase", async () => {
    TicketSale.methods
      .buyTicket(2)
      .send({ from: accounts[1], value: 1, gasPrice: 1500000, gas: 470000 });
    const ticketId = await TicketSale.methods.getTicketOf(accounts[1]).call();
    assert.equal(ticketId,2);
  });
  it("testing offer Swap", async () => {
    TicketSale.methods
    .buyTicket(2)
    .send({ from: accounts[1], value: 1, gasPrice: 1500000, gas: 470000 });


    TicketSale.methods
    .buyTicket(3)
    .send({ from: accounts[2], value: 1, gasPrice: 1500000, gas: 470000 });


    TicketSale.methods
    .offerSwap(accounts[1]).send({from: accounts[2], gasPrice: 1500000, gas: 470000});


    TicketSale.methods
    .acceptSwap(accounts[2]).send({from: accounts[1], gasPrice: 1500000, gas: 470000});


    const ticketId1 = await TicketSale.methods.getTicketOf(accounts[1]).call();
    const ticketId2 = await TicketSale.methods.getTicketOf(accounts[2]).call();


    assert(ticketId1 == 3);
    assert(ticketId2 == 2);
  });




});
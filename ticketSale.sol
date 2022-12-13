// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract TicketSale {

    // Varibles go here
    
    //mapping here 
    mapping (address => uint) tickets;
    mapping (uint => address) ticketsSold;
    uint numTickets;
    uint private price;
    mapping (address => address) swapOffers;
    
    constructor(uint numTicket, uint p) public {
        numTickets = numTicket;
        price = p;
    }
    


    function buyTicket(uint ticketId) public payable {
        bool success;
        bytes memory data;
        require(ticketId >= 1 && ticketId <= numTickets); 
        require (ticketsSold[ticketId] == address(0)); 
        require(tickets[msg.sender] == 0); 
        require(msg.value == price); 
        tickets[msg.sender] = ticketId;
        ticketsSold[ticketId] = msg.sender;

    }

    function getTicketOf(address person) public view returns (uint
    ) {
        return tickets[person];
    }

    function offerSwap(address partner) public {
        require(tickets[msg.sender] > 0); 
        require(tickets[partner] > 0);
        require(partner != msg.sender); 
        swapOffers[msg.sender] = partner;
    }

    function acceptSwap(address partner) public {
        require(tickets[msg.sender] > 0); // sender has the ticket 
        require(swapOffers[partner] == msg.sender); // if partner can swap
        (tickets[msg.sender], tickets[partner]) = (tickets[partner], tickets[msg.sender]); // swap
        ticketsSold[tickets[msg.sender]] = msg.sender;
        ticketsSold[tickets[partner]] = partner;
        swapOffers[partner] = address(0);
    }

}
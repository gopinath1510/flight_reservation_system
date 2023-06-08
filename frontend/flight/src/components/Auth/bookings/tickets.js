import React from "react";
const ShowTicket=()=>{


    return(<>
    <h3>{ticket.id}</h3>
    <h3>{ticket.userid}</h3>
    <h3>{ticket.flightid}</h3>
    <h3>{ticket.numberofseats}</h3>
    <h3>{ticket.totalpay}</h3>
    </>)
}
export default ShowTicket;
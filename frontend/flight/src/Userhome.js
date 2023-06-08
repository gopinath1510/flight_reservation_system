import React, { useState, useEffect } from "react";

const Userhome = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState(false);
  const [book, setBook] = useState(false);
  const [ticketChange, setTicketChange] = useState(false);
  const [search, setSearch] = useState({
    departure: "",
    destination: "",
    date: "",
  });
  const [flights, setFlights] = useState([]);
  const [flightid, setFlightid] = useState("");
  const [seat, setseat] = useState(1);
  function handleChange(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
    // console.log(search);
  }

  async function handleBook(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const numberofseat = formdata.get("numberofseat");
    const response = await fetch("http://localhost:3001/user/bookflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: localStorage.getItem("userId"),
        flightid: flightid,
        numberofseats: numberofseat,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Your Booking confirmed!Happy Journey");

      setFlightid("");
      setView(false);
      setTicketChange((prev) => !prev);
    }
    if (response.status == 404) {
      alert(data.message);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    let f;
    try {
      f = await fetch("http://localhost:3001/user/findflight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      });
      var response = await f.json();
      if (!response.flight) {
        alert("No flight available for given details");
      }
      setFlights(response.flight);
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancelTicket = async (ticketid) => {
    const response = await fetch(
      `http://localhost:3001/user/cancelticket/${ticketid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert("Ticket cancelled successfully");
      setTicketChange((prev) => !prev);
      user.user.booked = user.user.booked.filter((ele) => ele._id != ticketid);
      setUser(user);
    }
  };

  const hanldeAllflight = async () => {
    const flights = await fetch("http://localhost:3001/admin/getallflights");
    const data = await flights.json();
    setFlights(data.flight);
    setView(true);
    setBook(false);
  };

  const handlebookState = () => {
    setView(false);
    setBook((prev) => !prev);
  };
  const handleViewstate = () => {
    setView((prev) => !prev);
    setBook(false);
  };
  useEffect(() => {
    async function get() {
      try {
        const response = await fetch(
          `http://localhost:3001/user/getuserdetails/${localStorage.getItem(
            "userId"
          )}`
        );
        const data = await response.json();
        setUser(data); // Update the 'user' state with the fetched data
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, [ticketChange]);
  console.log(user);

  return (
    <>
      <h1>Welcome {user && user.user.name}</h1>
      <ul>
        <li>
          <button onClick={() => handleViewstate()}>View flights</button>
        </li>
        <li>
          <button onClick={() => handlebookState()}>Booked ticket</button>
        </li>
        <li>
          <button onClick={() => hanldeAllflight()}>View all flights</button>
        </li>
      </ul>

      {view && (
        <>
          <div>
            <h1>Search Flight</h1>
            <form onSubmit={(e) => handleSearch(e)} action="#">
              <input
                type="text"
                placeholder="enter departure"
                name="departure"
                value={search.departure}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="enter destination"
                name="destination"
                value={search.destination}
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="enter date"
                name="date"
                onChange={(e) => handleChange(e)}
              />
              <input type="submit" value="search" />
            </form>
          </div>
          <div>
            {flights &&
              flights.map((ele) => {
                return (
                  <>
                    <h1 key={ele.id}>{ele.flightname}</h1>
                    <h3>Departure:{ele.departure}</h3>
                    <h3>Destination:{ele.destination}</h3>
                    <h3>Seatsleft:{ele.seatleft}</h3>
                    <h3>Ticket price:{ele.ticketprice}</h3>
                    <h3>Date{ele.date}</h3>
                    <h3>Departure time:{ele.time}</h3>
                    <button onClick={() => setFlightid(ele._id)}>
                      Book ticket
                    </button>
                    {flightid === ele._id && (
                      <>
                        <form onSubmit={(e) => handleBook(e)}>
                          <input
                            placeholder="enter number of tickets"
                            name="numberofseat"
                            value={seat}
                            onChange={(e) => setseat(e.target.value)}
                          />
                          <input
                            type="submit"
                            value={`pay:${ele.ticketprice * seat}`}></input>
                        </form>
                      </>
                    )}
                    <hr />
                  </>
                );
              })}
          </div>
        </>
      )}

      {book && (
        <>
          {user.user.booked.map((ele) => {
            return (
              <>
                <h3>Ticket number:{ele._id}</h3>
                <h3>Number of seats:{ele.numberofseats}</h3>
                <h3>Total pay:{ele.totalpay}</h3>
                <h3>Booking date:{ele.bookeddate}</h3>
                <button onClick={() => handleCancelTicket(ele._id)}>
                  cancel ticket
                </button>
                <hr />
              </>
            );
          })}
        </>
      )}
    </>
  );
};
export default Userhome;

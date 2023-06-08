import React, { useState, useEffect } from "react";

const Adminhome = () => {
  const [change, setChange] = useState(false);
  const [user, setUser] = useState(null);
  const [flights, setFlight] = useState([]);
  const [view, setView] = useState(false);
  const [create, setCreate] = useState(false);

  const getflight = async () => {
    setFlight(user.flights);
    setView((prev) => !prev);
    setChange((prev) => !prev);
    console.log(user);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const flightData = {
      flightnumber: formdata.get("flightnumber"),
      flightname: formdata.get("flightname"),
      departure: formdata.get("departure"),
      destination: formdata.get("destination"),
      date: formdata.get("date"),
      time: formdata.get("time"),
      ticketprice: formdata.get("ticketprice"),
    };
    flightData["creator"] = user._id;
    const flight = await fetch("http://localhost:3001/admin/addflight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightData),
    });
    const data = await flight.json();
    if (flight.ok) {
      alert("flight added successfully");
    }
  };

  useEffect(() => {
    async function get() {
      try {
        const response = await fetch(
          `http://localhost:3001/admin/admindetail/${localStorage.getItem(
            "userId"
          )}`
        );
        const data = await response.json();
        setUser(data.admin);
        setFlight(data.admin.flights);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, [change]);

  const handeCancel = async (flightid) => {
    const flight = await fetch(
      `http://localhost:3001/admin/cancelflight/${flightid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await flight.json();
    console.log(data);
    if (flight.ok) {
      alert(data.message);
      setChange((prev) => !prev);
      user.flights = user.flights.filter((ele) => ele._id !== flightid);
      setFlight(user.flights);
    }
  };

  const handlecreateState = () => {
    setCreate((prev) => !prev);
    setView(false);
  };

  return (
    <>
      <h1>Welcome {user && user.name}</h1>
      <ul>
        <li>
          <button onClick={() => getflight()}>Manage your flight</button>
        </li>
        <li>
          <button onClick={() => handlecreateState()}>Add flight</button>
        </li>
      </ul>
      {view &&
        flights.map((ele) => {
          return (
            <div key={ele._id}>
              <h1>{ele.flightname}</h1>
              <h3>Departure: {ele.departure}</h3>
              <h3>Destination: {ele.destination}</h3>
              <h3>Seats left: {ele.seatleft}</h3>
              <h3>Ticket price: {ele.ticketprice}</h3>
              <h3>Date: {ele.date}</h3>
              <h3>Departure time: {ele.time}</h3>
              <button onClick={() => handeCancel(ele._id)}>
                Cancel flight
              </button>
              <hr />
            </div>
          );
        })}

      {create && (
        <form onSubmit={(e) => handleCreate(e)}>
          <input
            type="number"
            placeholder="Enter flight number"
            name="flightnumber"
          />
          <input
            type="text"
            placeholder="Enter flight name"
            name="flightname"
          />
          <input type="text" placeholder="Enter departure" name="departure" />
          <input
            type="text"
            placeholder="Enter destination"
            name="destination"
          />
          <input type="text" placeholder="Enter date" name="date" />
          <input type="text" placeholder="Enter time" name="time" />
          <input
            type="number"
            placeholder="Enter ticket price"
            name="ticketprice"
          />
          <input type="submit" value="Submit" />
        </form>
      )}
    </>
  );
};

export default Adminhome;

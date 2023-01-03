import { useState } from "react";
import Select from "react-select";
// const { tickets } = require("./data");
const statusOptions = [
  { label: "To Do", value: "11" },
  { label: "In Progress", value: "21" },
  { label: "Done", value: "31" },
];


export default function TableTickets(props) {
  let {tickets , setAllTickets} = props
  // let [allTickets,setTickets] = useState(tickets)
  const handleTicketStatus = (e,index) => {
    console.log("EVENT AND INDEX", e, index)
    let tempAllTickets = [...tickets];
    let tempTicket = tempAllTickets[index];
    tempTicket.Status = e.value;
    setAllTickets(tempAllTickets);
  }
  return (
    <div className="container">
      <div className="row border">
        <div className="col-2 border">ID</div>
        <div className="col-2 border">Name</div>
        <div className="col-2 border">Description</div>
        <div className="col-2 border">Reporter</div>
        <div className="col-2 border">Status</div>
        <div className="col-2 border">Due Date</div>
      </div>
      
        {allTickets?.map((ticket,index) => (
         <div className="row" key={index}>
            <div className="col-2 border py-2">{ticket.Id}</div>
            <div className="col-2 border py-2">{ticket.Name}</div>
            <div className="col-2 border py-2">{ticket.Description}</div>
            <div className="col-2 border py-2">{ticket.Reporter}</div>
            <div className="col-2 border py-2">
              <Select
                maxMenuHeight={150}
                options={statusOptions}
                value={statusOptions.find((opt)=>opt.label === ticket.Status)}
                onChange={(e) => handleTicketStatus(e,index)}
              />
            </div>
            <div className="col-2 border py-2">{ticket.Due_Date}</div>
            </div>
        ))}
      
    </div>
  );
}

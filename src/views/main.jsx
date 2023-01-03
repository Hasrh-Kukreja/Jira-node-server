import React, { useState, useEffect } from 'react';
import axios from "axios";
import TableTickets from "./ticketsTable";


export default function Main(){
   const [tickets, setAllTickets] = useState([]);
    useEffect(() => {
        fetchTickets();
      },[]);
    const fetchTickets = async () => {
        try{
         let response = await axios.get(`http://localhost2410/getIssue`);
         console.log("Tickets fetched successfully",response.data);
         setAllTickets(response.data);
        } catch(error){
            return error;
        }
    }

    editTicket = async () => {
        try{
            let response = await axios.post(`http://localhost:2410/editIssue`,tickets);
            setAllTickets(ticketData);
        } catch(error){
            return error
        }
    }
        return(
            <div className="container">
                 <div className="mb-2 mt-2">
                    <button className="btn btn-primary" onClick={editTicket}>
                    Update Changes
                    </button>
                </div>
                <TableTickets tickets = {tickets} setAllTickets = {setAllTickets} editTicket = {editTicket}/>
            </div>
        )
    }

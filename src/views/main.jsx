import TableTickets from "./ticketsTable";

export default function Main(){
        return(
            <div className="container">
                 <div className="mb-2 mt-2">
                    <button className="btn btn-primary">
                    Update Changes
                    </button>
                </div>
                <TableTickets />
            </div>
        )
    }

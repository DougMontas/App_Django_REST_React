import React from 'react'
import { GrList } from "react-icons/gr"

const Header = () => {

    let today = new Date();
    let todaysDate = today.toDateString();

    return (
        
            <div className="App">
                <div className="container">
                    <h1>
                        <GrList /> Power todo List{" "}
                    </h1>
                    <p className="todays-date">{todaysDate}</p>
                </div>
            </div>
    )
}

export default Header
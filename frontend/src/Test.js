import React, {useState} from 'react'
import axios from "axios";
import { saveAs } from "file-saver";



function Test() {
    const [server, setServer] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [tag, setTag] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

  const handleReport = () => {

    axios.post('http://localhost:3001/report', {
            server: server,
            username: username,
            password: password,
            tag: tag,
            startDate: startDate,
            endDate: endDate
        }).then( response => {
            const date = new Date();
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
            const dateTime = `${year}${month}${day}${time}`
            const file = new Blob([response.data], {type: 'text/plain;charset=utf-8' })
            saveAs(file, `Report${dateTime}.csv`)            
        })
        .catch(err => console.log(err))

        setServer("");
        setUsername("");
        setPassword("");
        setTag("");
        setStartDate("");
        setEndDate("");

    
    }

  return (
    <>
    
    <div>
        <input type='text' placeholder='PRTG Server' value={server} onChange={(e) => setServer(e.target.value)}/>
    </div>
    <div>
        <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div>
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div>
        <input type='text' placeholder='TAG' value={tag} onChange={(e) => setTag(e.target.value)}/>
    </div>
    <div>
        <input type='date' placeholder='StartDate' value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
    </div>
    <div>
        <input type='date' placeholder='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
    </div>
    <div>
        <button onClick={handleReport}> Generate Report</button>
    </div>
    </>
  )
}

export default Test
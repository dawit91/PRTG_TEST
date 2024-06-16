import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import axios from "axios";
import express from "express";
import * as csv from "csv-writer";
import fs from "fs";
import { send } from 'process';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const records =  [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];

const app = express();
const port = 3001;
// app.use(cors());
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        name: "Dawit"
    })
})


const baseUrl = 'https://jsonplaceholder.typicode.com/todos/';
const newList = [1,2,3,4,5,6,7,8,9,10,11];

function getTodos(item) {
    return(
        axios.get(`${baseUrl}${item}`)
    )
}



app.post('/report' ,(req, res) => {
    const { server, username, password, tag, startDate, endDate } = req.body
    if ( typeof server !== 'undefined'){
        if (server.length > 0 && username.length > 0 && password.length> 0 && tag.length > 0 && startDate.length > 0 && endDate.length > 0) {
            async function getTodosWithNum() {
                const withNums = await Promise.all(newList.map ( num => getTodos(num)));
                return withNums
            }
            const todosWithNums = getTodosWithNum()
            todosWithNums.then( data => {
                const list10 = data.map( ele => ele.data)
                const date = new Date();
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
                const dateTime = `${year}${month}${day}${time}`
                const PATH = `/file${dateTime}.csv`
                const csvWriter = csv.createObjectCsvWriter({
                    path: `.${PATH}`,
                    header: [
                        {id: 'userId', title: 'USERID'},
                        {id: 'id', title: 'id'},
                        {id: 'title', title: 'TITLE'},
                        {id: 'completed', title: 'COMPLETED'}
                    ]
                });
                csvWriter.writeRecords(list10)
                var file = __dirname + PATH
                var filestream = fs.createReadStream(file)
                filestream.pipe(res)
                fs.rm(`.${PATH}`, (err) => {
                    
                })
            })
            console.log(server, username, password, tag, startDate, endDate)
        }
        else {
            res.json({
                data: "wrong"
            })
        }
    }
    else {
        res.json({
            data: "wrong"
        })
    }
    
    
})
app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})



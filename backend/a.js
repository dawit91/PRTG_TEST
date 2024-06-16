import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(__dirname)

const newList = [1,2,3,4,5];
const baseUrl = 'https://jsonplaceholder.typicode.com/todos/';

function getTodos(name) {
    return axios.get(
        `${baseUrl}${name}`
    );
}

async function getTodoswithNum () {
    const withNums = await Promise.all(newList.map( num => getTodos(num)));
    return withNums
}

const todosWithNums = getTodoswithNum();


const newList10 = todosWithNums.then(data => {
     
    const list10 = data.map( ele => ele.data)
    return list10
})
// newList10.then(data => console.log(data))

// async function createNewList () {
//     const newList2 = await Promise.all(todosWithNums.then())
// }


const date = new Date();

const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
console.log(`${year}${month}${day}`)
console.log(time)

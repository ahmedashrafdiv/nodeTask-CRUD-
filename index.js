let fss = require("fs");
const { isJSON } = require("validator");

let [,,task]= process.argv

if(task=="create"){

    let [,,,action]= process.argv

    // give data and parse data to json
    let jsonData = JSON.parse(fss.readFileSync("./json.json"))

    // push new task
    jsonData.push({title:action})

    // convert json to string and write to file again
    let fullData  = JSON.stringify(jsonData)
    fss.writeFileSync("./json.json",fullData)   

}else if(task=="list"){

    // read data and parse data to json
    let jsonData = JSON.parse(fss.readFileSync("./json.json"))

    // loop of tasks list 
    for (let i = 0; i < jsonData.length; i++) {
        console.log(`task ${true + i} is ==> ${jsonData[i].title} `);
    }

}else if(task=="update"){

    // read data and parse data to json
    let jsonData = JSON.parse(fss.readFileSync("./json.json"))

    //  read taskDown and taskUpdate
    let [,,,taskDown,,taskUpdate] = process.argv

    // find this update task
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].title == taskDown) {
            jsonData[i].title = taskUpdate
        }
    }

    fss.writeFileSync("./json.json",JSON.stringify(jsonData))
}else if(task=="deleteOne"){

    // read data and parse data to json
    let jsonData = JSON.parse(fss.readFileSync("./json.json"))

    // give title of task delete
    let [,,,titleOfTaskDelete] = process.argv

    // search task and delete task
    for (let i = 0; i < jsonData.length; i++) {
        if(jsonData[i].title == titleOfTaskDelete) {
            jsonData.splice(i,1)
        }
    }   

    // convert json to string and write to file again
    fss.writeFileSync("./json.json",JSON.stringify(jsonData))

}else if(task=="deleteAll"){

    // delete all tasks
    fss.writeFileSync("./json.json","[]")

}else{console.log(`Error`);}

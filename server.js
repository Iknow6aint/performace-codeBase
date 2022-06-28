const express = require("express");
const cluster = require("cluster");
const os = require('os')

const app =express();

function delay(duration){
    const startTime = Date.now();
    while (Date.now()- startTime<duration) {
        //loop blocked...
    }
}
app.get("/",(req,res) =>{
    //JSON.stringify({})=>"{}"
    //JSON.parse("{}")=>{}
    res.send(`performance example ${process.pid}`)
});

app.get("/timer",(req,res)=>{
    //delay
    delay(9000)
    res.send(`ding dind ${process.pid}`)
})

if (cluster.isMaster){
    console.log("master has been started..");
    const NUM_WORKERS = os.cpus().length
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
}else{
    console.log('Worker has started');
    app.listen(5000,()=>{
        console.log("listinnig on Port")
    })
}


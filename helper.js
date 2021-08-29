const fs = require('fs');

 jsonReader=(path, callback)=>{
     message = fs.readFileSync(path, 'utf-8');
     console.log(message);
     return JSON.parse(message);
    //  fs.readFile(path, 'utf-8', (err, jsonString) => {
    //          message = JSON.parse(jsonString);
    //          callback(message);
    //          jsonWriter(path, message)
    //  })
}

jsonWriter = async (path) =>{
    let storedMessage =  JSON.parse(fs.readFileSync(path, 'utf-8'));
    storedMessage.numberOfCalls = parseInt(storedMessage.numberOfCalls) +1;
    storedMessage.lastMessage = `The last message is #${storedMessage.numberOfCalls}`;

    fs.writeFileSync(path, JSON.stringify(storedMessage), err =>{
        if(err){
            console.log(err);
        }
        else{
            const jsonstring = JSON.stringify(storedMessage);
             console.log("successfully input message");
        }
    })

}
 
secretGurd = async (ctx, next) => {
    const role = ctx.request.body;

    if(!role ==="admin")
    {
        ctx.response.redirect('/login');
    }
    next();
}


module.exports ={
    jsonReader,
    jsonWriter,
    secretGurd
}


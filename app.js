const express = require('express');
const app = express();






app.listen(4500, ()=>{
    console.log(`Listening on port 4500`);
})

// const port  = process.env.PORT = 4080;
// app.listen(`Listening on port ${port}`);
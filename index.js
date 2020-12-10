const http = require("http");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");



const PORT = 4000;

const app = express();
const es6Renderer = require("express-es6-template-engine");
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


const server = http.createServer(app);

app.use(express.static("public"));
app.use(helmet());

const logger = morgan("tiny");
app.use(logger);


const pets = ["Kobe", "Buddy", "Sheeba", "Rocky", "Mojo"]


app.get("/", (req,res) => {
    console.log(req.url, req.method)
    res.render("home")
        
    });


app.get("/pets", (req,res) => {
   const names = pets
   res.render("petList", {
       locals:{
           names,
       },
   });
});

app.get("/pets/:name", (req,res) => {
    const {name} = req.params
    res.render("pets", {
        locals: {
            name,
        }
    })
})

server.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})
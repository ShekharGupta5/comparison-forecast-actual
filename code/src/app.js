const path = require('path');
const express = require('express')
const hbs = require('hbs')

const app = express();
port = process.argv[2] || 5000 ;
viewPath = path.join(__dirname, './views/templates/');
partialPath = path.join(__dirname, './views/partials/');


app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

hbs.registerHelper('check',function(value){
    if(value == 200){
        return 'i aogt the status code '
    }
})
const general = require('./routes/RouteGeneral')
const generation = require('./routes/RouteGeneration')

app.use('/',general);
app.use('/generation',generation)

app.listen(port, ()=>{
    console.log(`Server is listening on ${port} ...`);
})



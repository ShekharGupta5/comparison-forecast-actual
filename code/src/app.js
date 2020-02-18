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
hbs.registerHelper('upperFirst',function(value){
    if(value == undefined){
        return null;
    }
    return value.charAt(0).toUpperCase() + value.slice(1) ;
})

const general = require('./routes/RouteGeneral')
const generation = require('./routes/RouteGeneration')
const downloadData = require('./routes/RouteDownload')

app.use('/',general);
app.use('/generation',generation)
app.use('/downloadData',downloadData)


app.listen(port, ()=>{
    console.log(`Server is listening on ${port} ...`);
})



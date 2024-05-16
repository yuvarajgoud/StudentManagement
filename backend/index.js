const  express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express();


// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.get('/',(req,res)=>{
    res.send("This is My Server");
})

app.get('/students',(req,res)=>{
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err) {
            console.log("Error! Cannot Read File");
            return;
        }
        const students = JSON.parse(data);
        res.json(students)
    })
})

app.get('/students/:id',(req,res) =>{
    const id = req.params.id
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err) {
            console.log("Error! Cannot Read File");
            return;
        }
        const students = JSON.parse(data);
        const findStudent = students.find(item => item.id==id);
        res.json(findStudent)
    })
})

app.post('/students',(req,res) => {
    const newStudent = {
        id : req.body.id,
        name : req.body.name,
        branch : req.body.branch
    }

    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err) {
            console.log("Error! Cannot Read File");
            return;
        }
        const students = JSON.parse(data);
        students.push(newStudent);
        fs.writeFile('./data.json',JSON.stringify(students), (err)=>{
            if(err) {
                console.log("Error!! Cannot write into file");
                return;
            }
            res.json(newStudent);
        })
    })
})

app.put('/students/:id',(req,res) => {
    const id = req.params.id
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err) {
            console.log("Error! Cannot Read File");
            return;
        }
        const students = JSON.parse(data);
        const findStudent = students.find(item => item.id==id);
        findStudent.name = req.body.name;
        findStudent.branch = req.body.branch;
        fs.writeFile('./data.json',JSON.stringify(students), (err)=>{
            if(err) {
                console.log("Error!! Cannot write into file");
                return;
            }
            res.json(newStudent);
        })
        res.json(findStudent)
    })
})

app.delete('/students/:id',(req,res) => {
    const id = req.params.id
    fs.readFile('./data.json','utf8',(err,data)=>{
        if(err) {
            console.log("Error! Cannot Read File");
            return;
        }
        const students = JSON.parse(data);
        const newStudents = students.filter(item => item.id!=id);
        fs.writeFile('./data.json',JSON.stringify(newStudents), (err)=>{
            if(err) {
                console.log("Error!! Cannot write into file");
                return;
            }
        })
        res.json("Deleted Succesfully")
    })
})


app.listen(8000,()=>{
    console.log("Server is Running");
})
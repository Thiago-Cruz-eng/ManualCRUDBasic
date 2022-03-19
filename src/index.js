const express = require('express');
const {uuid} = require('uuidv4');
const app = express();

app.use(express.json())

const projects = [];


app.get('/projects', (req, res) => {


 return res.json(projects);
})

app.post('/projects', (req, res) => {

 const {tittle, owner} = req.body;
 const project = {id: uuid(), tittle, owner};

 projects.push(project);

 return res.json(project)
})

app.put('/projects/:id', (req, res) => {
 const {id} = req.params
 const {tittle, owner} = req.body;


 const projectIndex = projects.findIndex(project => project.id === id);

 if(projectIndex < 0) {
  return res.status(404).json({message:'Usuario nao encontrado!'})
 }

 const project = {
  id,
  tittle,
  owner,
 };

 projects[projectIndex] = project;

 const params = req.params;
 console.log(params)

 return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
 const {id} = req.params
 const {tittle, owner} = req.body;

 const projectIndex = projects.findIndex(project => project.id === id);

 if(projectIndex < 0) {
  return res.status(404).json({message:'Usuario nao encontrado!'})
 }

 projects.splice(projectIndex, 1);

 return res.status(204).send()
})

app.listen(3333, () => {
 console.log('Server started!')
});

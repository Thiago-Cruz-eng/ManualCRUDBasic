const express = require('express');
const {uuid, isUuid} = require('uuidv4');
const app = express();

app.use(express.json())

const projects = [];

function logRequets(req, res, next) {
 const { method, url } = req;

 const logLabel = `[${method.toUpperCase()}] ${url}`;
 console.log(logLabel);

 return next();
}

function validadeProjectId(req, res, next) {
 const  { id } = req.params;

 if (!isUuid(id)) {
  return res.status(400).json({ message: 'Invalid project'});
 }

 return next();
}

app.use(logRequets)
app.use('/projects/:id', validadeProjectId)

app.get('/projects', (req, res) => {
 const {tittle} = req.query;

 const results = tittle 
 ? projects.filter(project => project.tittle.includes(tittle))
 : projects;

 return res.json(results);
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

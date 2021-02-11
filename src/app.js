const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO list all the repositories

  return response.json(repositories);
});

app.post("/repositories/", (request, response) => {
  // TODO create new repository with title, url and techs

  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title: title, url: url, techs: techs, likes: 0};
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO update title url and techs of repository with id
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
  const repository = { id: repositories[repositoryIndex].id, title: title, url: url, techs: techs, likes: repositories[repositoryIndex].likes };
  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO delete repository by id
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json("error: Repository not founded!");
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO aumentar o numero de likes do repositorio com o id = :id
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);
  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;

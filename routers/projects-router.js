const express = require('express')
const projects = require('../data/helpers/projectModel')
const actions = require('../data/helpers/actionModel')
const router = express.Router()

router.get("/", (req, res) => {
    projects.get()
    .then(project => {
        res.status(200).json({ data: project })
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)

    projects.get(id)
    .then(project => {
        if(project){
            res.status(200).json({ data: project })
        } else{
            res.status(404).json({ errorMessage: "No project with that id found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.get("/:id/actions", (req, res) => {
    const id = Number(req.params.id)

    projects.getProjectActions(id)
    .then(action => {
        if(action.length > 0){
            res.status(200).json({ data: action })
        } else{
            res.status(404).json({ data: "No project with that id found or project has no actions" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.post("/", (req, res) => {
    projects.insert(req.body)
    .then(project => {
        res.status(201).json({ data: project })
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.post("/:id/actions", validateId, (req, res) => {
    actions.insert(req.body)
    .then(action => {
        res.status(201).json({ data: action })
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    projects.update(id, req.body)
    .then(project => {
        if(project){
            res.status(200).json({ data: project })
        } else{
            res.status(404).json({ errorMessage: "No project with that id found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    projects.remove(id)
    .then(numDeleted => {
        if(numDeleted === 1){
            res.status(200).json({ message: `Delete ${numDeleted} post(s)` })
        } else{
            res.status(404).json({ errorMessage: "no post with that id found to delete"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

// custom middleware

function validateId(req, res, next){
    const { project_id } = req.body
    const usableId = Number(project_id)

    projects.get(usableId)
    .then(project => {
        if(project){
            next()
        } else{
            res.status(400).json({ errorMessage: "project id must match url" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
}

const errMessage = "A server error has occured."

module.exports = router
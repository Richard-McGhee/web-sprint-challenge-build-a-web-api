const express = require('express')
const actions = require('../data/helpers/actionModel')
const router = express.Router()

router.get("/", (req, res) => {
    actions.get()
    .then(action => {
        res.status(200).json({ data: action })
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)

    actions.get(id)
    .then(action => {
        if(action){
            res.status(200).json({ data: action })
        } else{
            res.status(404).json({ errorMessage: "No actioni with that id found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    actions.update(id, req.body)
    .then(action => {
        if(action){
            res.status(200).json({ data: action })
        } else{
            res.status(404).json({ errorMessage: "No action with that id found to update" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    actions.remove(id)
    .then(numDeleted => {
        if(numDeleted > 0){
            res.status(200).json({ message: `Delete ${numDeleted} action(s)` })
        } else{
            res.status(404).json({ errorMessage: "No actions with that id found to delete" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, errorMessage: errMessage })
    })
})

const errMessage = "A server error has occured."

module.exports = router
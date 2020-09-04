const express = require('express')
const projectsRouter = require('./routers/projects-router')
const actionsRouter = require('./routers/actions-router')
const helmet = require('helmet')

const server = express()
server.use(express.json())
server.use(helmet())

server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)

server.get("/", (req, res) => {
    if(req){
        res.status(200).send("You're at a blank starting page!")
    } else{
        res.status(500).json({ errorMessage: "Somehow it already broke" })
    }
})

const port = process.env.PORT || 666
server.listen(port, () => {
    console.log(`We're live at port: ${port}`)
})
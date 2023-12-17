import express from "express"
import cors from "cors"
import connectToDatabase from "./database/connection.js"
import testRoutes from "./routes/testRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import userProgressRoutes from "./routes/userProgressRoutes.js"

connectToDatabase()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Working Fine!')
})

// Routes
app.use('/test', testRoutes)

app.use('/users',userRoutes)

app.use('/userprogress/',userProgressRoutes)

app.listen(port, () => {
    console.log(`App listening at PORT:${port} and live at http://localhost:${port}`)
})
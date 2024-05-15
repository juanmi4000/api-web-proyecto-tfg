import express from "express"

const PORT = process.env.PORT || 3000

const app = express()

app.disable("x-powered-by")

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" })
})

app.listen(PORT, () => {
  console.log(`Server API is running on port http://localhost:${PORT}`)
})
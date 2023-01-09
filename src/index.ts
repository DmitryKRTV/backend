import express, {Request, Response} from "express"
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

const app = express()
const port = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
    let helloMessage = "hello incubator!!";
    res.send(helloMessage)
})

app.use(bodyParser())

app.use("/products", productsRouter)
app.use("/addresses", addressesRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
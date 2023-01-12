import {MongoClient} from "mongodb";
import {ProductType} from "./products-db-repository";

const mongoURI = process.env.mongoURI = "mongodb://0.0.0.0:27017/"

const client = new MongoClient(mongoURI)
const db = client.db("shop");
export const productsCollection = db.collection<ProductType>("products");

export async function runDb() {
    try {
        await client.connect()
        await client.db("products").command({ping: 1})
        console.log("Connected Db")
    } catch {
        await client.close()
        console.log("Connect failed")
    }
}
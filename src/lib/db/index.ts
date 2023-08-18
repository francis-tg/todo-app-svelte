import { MongoClient } from "mongodb"
const DB_USER="vercel-admin-user"
const DB_PWD = "UFNbrgJ1DjaTPwIe"
const DB_URI:string | undefined = process.env.DB_URI || `mongodb+srv://${DB_USER}:${DB_PWD}@ecommerce.6mw8wtv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(DB_URI)
await client.connect()
export default client.db('todos')
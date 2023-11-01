import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const mongo_data = process.env.MONGO_DATA_URL
const mongo_insert = process.env.MONGO_INSERT_URL

export const mongoDataDB = mongoose.createConnection(mongo_data, { useNewUrlParser: true, useUnifiedTopology: true })
export const mongoInsertDB = mongoose.createConnection(mongo_insert, { useNewUrlParser: true, useUnifiedTopology: true })

const initMongoDB = async () => {
    mongoDataDB.once('open', () => {
        console.log("data mongodb client initialized");
    });

    mongoInsertDB.once('open', () => {
        console.log("insert mongodb client initialized");
    });
}



export default initMongoDB

import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number     //optional (?)
}

const connection: ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Connected already");
        return;
    }

    try{
        const db = await mongoose.connect(process.env.MONGO_URI || '',{})
        connection.isConnected= db.connections[0].readyState;

        console.log("Connected to DB");

    } catch(error){
        console.log("Databse Connection failed",error);
        process.exit(1);
    }
}

export default dbConnect;
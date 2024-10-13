import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number;
}


const connection : ConnectionObject = {};



async function dbConnect(){
    if (connection.isConnected){
        console.log('DB is already connected!');
        return;
    }else{
        try {
            const db = await mongoose.connect(process.env.DATABASE_URL!);
            connection.isConnected = db.connections[0].readyState;
            console.log('DB connected successfully!');
        } catch (error) {
            console.error('Error connecting to DB:', error);
            process.exit(1);
        }
    }
}


export default dbConnect;


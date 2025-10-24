    const {connectDB} = require('../config/db');

    const getMovies = async()=>{

        console.log("GetModel");

        const db = await connectDB();

        const movies = await db.collection('movies').find().toArray();


        return movies;

    }


    module.exports = {

        getMovies

    }
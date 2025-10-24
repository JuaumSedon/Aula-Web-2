    const {connectDB} = require('../config/db');

    const getMovies = async()=>{

        console.log("GetModel");

        const db = await connectDB();

        const movies = await db.collection('movies').find().toArray();


        return movies;

    }


    const getMovie = async(id)=>{

        console.log("GetModel pelo id");
        const db = await connectDB();

        const numeroId = parseInt(id);

        const movie = await db.collection('movies').findOne({id: numeroId});

        return movie;
    }


    module.exports = {

        getMovies,
        getMovie

    }
const { connectDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getMovies = async () => {

    console.log("GetModel");

    const db = await connectDB();

    const movies = await db.collection('movies').find().toArray();


    return movies;

}


const getMovie = async (id) => {

    const db = await connectDB();

    const numeroId = new ObjectId(id);

    const movie = await db.collection('movies').findOne({ _id: numeroId });

    return movie;
}


const getDate = async (date) => {

    const db = await connectDB();


    const dataFilme = new Date(date);


   const movies = await db.collection('movies').find({ date: { $gt: dataFilme } }).toArray();

   return movies;

}



const addMovie = async (data) => {

    console.log("Adicionando filme Model : ", data);

    const newMovie = {
        name: data.name,
        director: data.director,
        link: data.link,
        date: new Date(),

    };

    const db = await connectDB();
    const addedMovie = await db.collection('movies').insertOne(newMovie);

    console.log(`Filme adicionado com o seguinte id ${addMovie.insertedId}`);

    return addedMovie;

};


module.exports = {

    getMovies,
    getMovie,
    addMovie,
    getDate,

}
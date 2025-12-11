//Importar model
const { getMovies } = require('../Models/moviesModel');

const getController = async (req, res) => {

    console.log("Movie controller get");

    try {

        const movies = await getMovies();



        if (movies.length === 0) {

            res.status(200).json({
                status: "success",
                message: "Nenhum filme encontrado.",
                data: []
            })

        }


        res.status(200).json({
            status: 'success',
            data: movies
        })

    } catch (error) {

        console.error("Erro no Controller get", error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar os filmes'
        })

    }


}


module.exports = getController;
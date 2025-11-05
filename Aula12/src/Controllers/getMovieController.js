//Importar model
const { getMovie } = require('../Models/moviesModel');

const getMovieController = async (req, res) => {


    try {

        const { id } = req.params;
        const movie = await getMovie(id);

        if (!movie) {
            
            
            res.status(404).json({
                message: "Filme não encontrado.",
                status: "error"
            })

        } else {
            res.status(200).json({
                status: 'success', 
                data: movie
            })
        }

    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar o filme' 
        })

    }
}

module.exports = getMovieController;
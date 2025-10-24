//Importar model
const { getMovie } = require('../Models/moviesModel');

const getMovieController = async (req, res) => {

    console.log("Movie controller get");

    try {

        const { id } = req.params;
        const movie = await getMovie(id);

        if (!movie) {
            
            
            res.status(404).json({
                status: 'fail', 
                message: 'Filme nao encontrado'
            })

        } else {
            res.status(200).json({
               
                status: 'success', 
                data: movie
            })
        }

    } catch (error) {

        console.error("Erro no Controller get", error);
        res.status(500).json({
            status: 'error',
    
            message: 'Erro ao buscar o filme' 
        })

    }
}

module.exports = getMovieController;
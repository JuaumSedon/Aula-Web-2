const { getDate } = require('../Models/moviesModel');


const getDateController = async (req, res) => {


    try {

        const { date } = req.params;

        const movies = await getDate(date)

        if (movies.length === 0) {


            return res.status(404).json({
                message: "Filmes não encontrado.",
                status: "error",
                data: []
            })

        }

        return res.status(200).json({
            status: 'success',
            data: movies
        })


    } catch (error) {

        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar o filme'
        })

    }
}



module.exports = getDateController;
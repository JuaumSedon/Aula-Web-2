
const dbConn = require('../config/db');
const taskModel = require('../model/taskModel');

module.exports.createTask = async (req, res) => {

     const dadosTask = req.body
     
    try {

        await taskModel.addTask(dbConn, dadosTask, (err, result) => {
            if (err) {

                return res.status(400).json({
                    status: 'error',
                    code: 400,
                    message: 'Bad Request'
                });

            } else {
                return res.status(201).json({
                    status: 'success',
                    code: 201,
                    message: 'Task adicionada.',
                    data: [dadosTask],
                });
            }
        })

    } catch (error) {

        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Erro interno createTasks.',
            error: error.message,
        });

    }




};

module.exports.getAllTasks = async(req, res) => {


    await taskModel.findAll(dbConn, (err, result) => {


        try {
            if (err) {
                console.log("erro findall");
            } else {

                res.status(201).json({
                    status: 'sucess',
                    code: 201,
                    data: result
                })

            }

        } catch (error) {

            return res.status(500).json({
                status: 'error',
                code: 500,
                message: 'Erro interno getAllTasks.',
                error: error.message,
            });

        }



    })
};


module.exports.updateTask = async(req, res) => {


    const {id} = req.params

    const dadosNovos = req.body

    await taskModel.updateTask(id,dadosNovos, dbConn, (err, result) => {

        try {
            if (err) {

                res.status(404).json({
                    status: 'error',
                    code: 404,
                    message: 'not Found'
                })

            } else {

                res.status(200).json({
                    status: 'sucess',
                    code: 200,
                    data: result
                })

            }

        } catch (error) {

            return res.status(500).json({
                status: 'error',
                code: 500,
                message: 'Erro interno updateTask.',
                error: error.message,
            });

        }

    })

};

module.exports.getTaskById = async(req, res) => {


    const {id} = req.params

    await taskModel.findById(id, dbConn, (err, result) => {

        try {
            if (err) {

                res.status(404).json({
                    status: 'error',
                    code: 404
                })

            } else {

                res.status(200).json({
                    status: 'sucess',
                    code: 201,
                    data: result
                })

            }

        } catch (error) {

            return res.status(500).json({
                status: 'error',
                code: 500,
                message: 'Erro interno getTasksById.',
                error: error.message,
            });

        }

    })

};



module.exports.deleteTask = async(req, res) => {

    try {

        const {id} = req.params

        await taskModel.removeTask(dbConn, id, (err, result) => {

            if (err) {
                return res.status(404).json({
                    status: 'error',
                    code: 404,
                    message: "task não encontrado para remoção.",
                });

            } else {

                res.status(200).json({
                    status: 'success',
                    code: 200,
                    message: "Task removida com sucesso.",
                });

            }
        })

    } catch (error) {

        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Erro interno deleteTasks.',
            error: error.message
        });

    }
};


module.exports = {

    findAll:(db,callback)=>{

        db.query('SELECT * FROM tasks',callback);
    },

    findById:(idTask,db,callback)=>{


        const sql = `SELECT * FROM tasks WHERE id=${idTask};`;

        db.query(sql,callback)
    },

    addTask:(db,dados,callback)=>{

        const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
        const valores = [dados.title,dados.description];
        db.query(sql,valores,callback);
    },

    updateTask:(db,dados,callback) =>{


        const sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
        const valores = [dados.title,dados.description];
        db.query(sql,valores,callback);

    },

    removeTask:(idTask,db,callback)=>{

        const sql = `DELETE FROM tasks WHERE id =${idTask};`;
        db.query(sql,callback);
        
    },


    toggleComplete:(db,dados,callback)=>{


        const sql = 'UPDATE tasks SET completed = NOT completed WHERE id = ?';
        const valores = [dados.completed];
        db.query(sql,valores,callback);
    }



};

// usuarioModel.js

import mysql from "mysql2/promise";
import config from "./../config";

const createUsuarioTableAndData = async () => {
    try {
        const dbConnection = await mysql.createConnection({
            host: config.host,
            database: config.database,
            user: config.user,
            password: config.password
        });

        const [rows, fields] = await dbConnection.execute(`SHOW TABLES LIKE 'Usuario'`);

        if (rows.length === 0) {
            await dbConnection.execute(`
            CREATE TABLE Usuario (
                id      INT             AUTO_INCREMENT  PRIMARY KEY,
                correo  VARCHAR(100)    NOT NULL,
                user    VARCHAR(50)     NOT NULL,
                pass    VARCHAR(100)    NOT NULL
            );
            `);
            console.log(`Tabla 'Usuario' creada exitosamente.`);
            
            await dbConnection.execute(`
            INSERT INTO Usuario (correo, user, pass) VALUES
            ('ken@altared.com', 'ken', '1234567'),
            ('mige@altared.com', 'mige', '1234567'),
            ('halo@altared.com', 'halo', 'halo123');
            `);
            console.log(`Datos insertados en la tabla 'Usuario'.`);
        } else {
            console.log(`La tabla 'Usuario' ya existe.`);
        }

        await dbConnection.end();
    } catch (error) {
        console.error('Error al crear o verificar la tabla Usuario:', error.message);
        throw error;
    }
};

export default createUsuarioTableAndData;

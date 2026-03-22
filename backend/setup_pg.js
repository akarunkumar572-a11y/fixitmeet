const { Client } = require('pg');
require('dotenv').config();

const setupDB = async () => {
    // Connect to default postgres db just to create the target db
    const client = new Client({
        connectionString: 'postgres://postgres:root@localhost:5432/postgres'
    });

    try {
        await client.connect();
        const res = await client.query("SELECT datname FROM pg_database WHERE datname = 'fixitmeet_db'");
        if (res.rowCount === 0) {
            console.log('Database fixitmeet_db not found, creating...');
            await client.query('CREATE DATABASE fixitmeet_db');
            console.log('Database fixitmeet_db created successfully.');
        } else {
            console.log('Database fixitmeet_db already exists.');
        }
    } catch (err) {
        console.error('Error ensuring database exists:', err.message);
    } finally {
        await client.end();
    }
};

setupDB();

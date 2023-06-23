import dotenv from 'dotenv';

dotenv.config();

export const defaultConnection = 
    `${process.env.DEFAULT_DIALECT}`
        .concat('://').concat(`${process.env.DEFAULT_USER}`)
        .concat(':').concat(`${process.env.DEFAULT_PASSWORD}`)
        .concat('@').concat(`${process.env.DEFAULT_HOST}`)
        .concat(':').concat(`${process.env.DEFAULT_PORT}`)
        .concat('/').concat(`${process.env.DEFAULT_DATABASE}`);


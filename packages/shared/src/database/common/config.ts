const env = require('../../../env');
let mode;

switch(process.env.NODE_ENV){
    case "production":
        mode="PROD_";
        break;
    case "development":
        mode="DEV_";
        break;
    case "test":
        mode="TEST_";
        break;
}

export const username = env[mode+"DB_ID"];
export const password = env[mode+"DB_PW"];
export const database = env[mode+"DATABASE"];
export const host = env[mode+"HOST"];
export const dialect = env[mode+"DIALECT"];
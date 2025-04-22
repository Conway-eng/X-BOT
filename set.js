const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1BLblp5YW5RQnc0Uzh4TDJEd1RPZVJwRERoaWMxRVp3NVZQTmpHRksxMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9MSExsSWQrUm1NQzlHR2x0d24wbkh0YS95SGMxK29RZXNGV04xRXVRTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SXZndEI0ZEc3bVhqWEVNZmhRUGd4czlVSlZGV1E3cWw5Sytta0lwaFdjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHbE1ML3RkMThySFpseWNwOTYzM2N4Z0htSVNLcnRXWU4wZWRnRVh1L2hVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNGcDZaYnU3VlVudTFNL2d1bjdieTErZHI3V3dEM3Fmcy9oYTF4bkpvMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJraUsvbjNEeEZYOFNKVEk0dHRqUnFhWDFnckIyMEJXVjh2OTlsbkMxZ009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU9nWTdHTmFyNHUvV0hzcE52dDdxMTNVbEFjUjdxYTdLdXE4NzAwNU9FND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQiticVdTaHAwUVZqK0ljMFFhTzVmckJQQVBwSWQ4bDV1OWN1ZGV6ekdtRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJCMG9WOEM5anRrcVVKbEhUaVc3OWNLSThJVTRmSVNJeEwwc2c5MEpPTGdnNDBMK2NqcTIvM0M3cWtXSFpUdnZ3alYrdjBqbzRpZGo0YVRNRHhJaWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIyLCJhZHZTZWNyZXRLZXkiOiJOa0lHelBFTWxSUjRUYllBN0NpeU9EYVZoeU9nVTRrSEsxL1lqMGRFSDZBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxODgzNTkzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDQjUyQUMyQTRFMENDNUI3RTVGRUFENUExMDE0MkQzRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MzU3ODQxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MTg4MzU5MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjlEQ0U2NjQ0NDk5QTNGNzFCOEFBN0M5OTJBNEIxRkIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTM1Nzg0NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZzEwOHlqa3ZUdWU1TGIydFlxUjNiZyIsInBob25lSWQiOiI4YTI2NTcxMS04ZDFlLTRkM2QtOGMyNy0xMTM3Y2ZhM2UxNTEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidngxMlhWdkhZZ1pPNmtZc0ZFaWtHbmg2a1pFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpxeDgweW5mQUJyVFBFcG9yVDVUVkt0Rjhtcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJTUUFYTExHWCIsIm1lIjp7ImlkIjoiMjU0NzE4ODM1OTMzOjcyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlVua25vd25zIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKbnd1c0VCRUlDWW9NQUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJlNEIxQW5MNm5NUVlyTFA0MEpWOXdhZ21vbFlWOU5BdEZWNGVldlIrUENvPSIsImFjY291bnRTaWduYXR1cmUiOiJOa24vSnl1c3M2clZKM3BIMmw2SzRvNG5DUmUweXhBOW95bTJsOUJ2eDlKVHRBbzhUdkpNWDdZWjFpNXdRelBVSUtPMGpVbFp6SjVVbWJmMDJuQkNEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQThoQ2QxeDVOUDRNL0xjb2pabENwTlpCS1Bsa1hrV0l5ejlBb2lYa21DZmpZQlBnM1VZeTdoc2Q1blhZT0RrQWlhT24rd25oUDhES3o3UzJ6SnhJanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTg4MzU5MzM6NzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWHVBZFFKeStwekVHS3l6K05DVmZjR29KcUpXRmZUUUxSVmVIbnIwZmp3cSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTM1NzgzOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEWlEifQ==',
    PREFIXE: process.env.PREFIX || ";",
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah254",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254718835933",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,🦚",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'yes', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Beltah md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'yes',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "BELTAH-MD",
    BOT : process.env.BOT_NAME || '𝗕𝗘𝗟𝗧𝗔𝗛-𝗠𝗗',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '3',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

import postgres from 'postgres';

export const openDatabase = () => {
  return postgres('', {
    host                 : process.env.POSTGRES_HOST || '',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : process.env.POSTGRES_DATABASE || '',           // Name of database to connect to
    username             : process.env.POSTGRES_USER || '',            // Username of database user
    password             : process.env.POSTGRES_PASSWORD || '',            // Password of database user
    ssl                  : false, 
  })
};
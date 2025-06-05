import postgres from 'postgres';

//const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const sql = postgres('', {
  host                 : process.env.POSTGRES_HOST || '',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : process.env.POSTGRES_DATABASE || '',           // Name of database to connect to
  username             : process.env.POSTGRES_USER || '',            // Username of database user
  password             : process.env.POSTGRES_PASSWORD || '',            // Password of database user
  ssl                  : false, 
})


async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

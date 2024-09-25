import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:0rEvLsYuTDi9@ep-aged-sound-w0m8llma.cloud.nitrogen.aws.neon.build/neondb?sslmode=require');

const data = await sql(`select * from todos`);
console.log(data);
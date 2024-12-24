import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';

export default defineConfig({
  driver: MySqlDriver,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  entities: ['./dist/**/**/*.entity.js'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['src/**/**/*.entity.ts'], // path to our TS entities (source), relative to `baseDir`
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  metadataCache: { enabled: false }, // temp folder will not be created to store cached data
  // extensions: [Migrator],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  // forceUtcTimezone: true,
  // debug: true,
});

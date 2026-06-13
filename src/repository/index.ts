import { type SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    const result = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );

    let currentDbVersion = result?.user_version ?? 0;

    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }

    if (currentDbVersion === 0) {
        await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
        `);

        await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
        await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
        currentDbVersion = 1;
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
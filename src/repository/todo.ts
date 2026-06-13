import { type SQLiteDatabase } from 'expo-sqlite';

interface Todo {
    value: string;
    intValue: number;
}

export const getTodos = async (db: SQLiteDatabase) => {
    await db.getAllAsync<Todo>('SELECT * FROM todos')
}

export const insertTodo = async (db: SQLiteDatabase) => {
    const statement = await db.prepareAsync(
        'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
    );

    try {
        await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
    } finally {
        await statement.finalizeAsync();
    }
}
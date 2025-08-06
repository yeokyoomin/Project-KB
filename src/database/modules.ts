import { eq } from 'drizzle-orm'
import { db } from '../database/db'
import { users, purchases } from '../database/schema'

export async function uidindb(this: any, uid: string): Promise<boolean> {
    try {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.user_id, uid))
            .limit(1);

        return result.length > 0;
    } catch (error) {
        console.log(`데이터베이스 명령 수행중 오류가 발생했어요 : ${error}`)
        return false
    }
}
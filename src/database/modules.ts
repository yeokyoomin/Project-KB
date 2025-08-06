import { eq } from 'drizzle-orm'
import { db } from '../database/db'
import { users, purchases } from '../database/schema'

/*유저가 데이터베이스에 있는지 확인하는 함수.*/
export async function uidindb(uid: string): Promise<boolean> {
    try {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.user_id, String(uid)))
            .limit(1);
        return result.length > 0;
    } catch (error) {
        console.log(`데이터베이스 명령 수행중 오류가 발생했어요 : ${error}`)
        return false
    }
}
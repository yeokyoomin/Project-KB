import { eq, sql } from 'drizzle-orm'
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
        console.log(`DB에서 UID를 확인하던 중 오류가 발생했어요 : ${error}`)
        return false
    }
}

/*유저 포인트 추가/제거 함수*/
export async function pointedit(uid: string, pamount: number): Promise<boolean> {
    try {
        await db
            .update(users)
            .set({ points: sql`${users.points} + ${pamount}` })
            .where(eq(users.user_id, String(uid)));
        return true
    } catch (error) {
        console.log(`포인트 추가/제거중 오류가 발생했어요 : ${error}`)
        return false
    }
}

/*유저 포인트 확인 함수 */
export async function userpoint(uid: string): Promise<number | null> {
    try {
        const result = await db
            .select({ points: users.points })
            .from(users)
            .where(eq(users.user_id, String(uid)));
        if (result.length === 0) return null;
        return result[0].points;
    } catch (error) {
        console.log(`포인트 추가/제거중 오류가 발생했어요 : ${error}`)
        return null
    }
}
import { eq, sql } from 'drizzle-orm'
import { db } from '../database/db'
import { users, purchases } from '../database/schema'

export async function ConnectionCheck() {
    try {
        await db.select().from(users).limit(1);
        return "DB가 정상적으로 연결되었어요!"
    } catch (error) {
        return `DB연결 중 오류가 발생했어요... ! ${error}`
    }
}
/*유저가 데이터베이스에 있는지 확인하는 함수.*/
export async function uidindb(uid: string): Promise<boolean> {
    try {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.id, uid))
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
            .where(eq(users.id, uid));
        return true
    } catch (error) {
        console.log(`포인트 추가/제거 중 오류가 발생했어요 : ${error}`)
        return false
    }
}

/*유저 포인트 확인 함수 */
export async function userpoint(uid: string): Promise<number | null> {
    try {
        const result = await db
            .select({ points: users.points })
            .from(users)
            .where(eq(users.id, uid));
        if (result.length === 0) return null;
        return result[0].points;
    } catch (error) {
        console.log(`포인트 확인 중 오류가 발생했어요 : ${error}`)
        return null
    }
}
import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and, gte, lte } from 'drizzle-orm';
import { Problem } from '../schema';
import { Member } from '../../member/schema';
import * as schema from '../schema';

@Injectable()
export class ProblemRepository {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: NodePgDatabase<typeof schema>,
    ) {}

    async findAll() {
        return this.database.select().from(Problem);
    }

    async findAllByMemberId(memberId: number) {
        return this.database
            .select()
            .from(Problem)
            .where(eq(Problem.memberId, memberId));
    }

    async findByMemberIdAndUrl(memberId: number, problemUrl: string) {
        return this.database.query.Problem.findFirst({
            where: and(
                eq(Problem.memberId, memberId),
                eq(Problem.problemUrl, problemUrl),
            ),
        });
    }

    async insert(req: typeof schema.Problem.$inferInsert) {
        return this.database.insert(Problem).values(req).returning();
    }

    async findProblemsWithMembers() {
        return this.database
            .select({
                id: Problem.id,
                title: Problem.title,
                problemUrl: Problem.problemUrl,
                site: Problem.site,
                createdAt: Problem.createdAt,
                memberId: Problem.memberId,
                member: {
                    id: Member.id,
                    email: Member.email,
                    name: Member.name,
                },
            })
            .from(Problem)
            .innerJoin(Member, eq(Problem.memberId, Member.id));
    }

    // ✅ 새로 추가: 특정 날짜 범위 조회
    async findByMemberIdAndDate(memberId: number, start: Date, end: Date) {
        return this.database
            .select()
            .from(Problem)
            .where(
                and(
                    eq(Problem.memberId, memberId),
                    gte(Problem.createdAt, start),
                    lte(Problem.createdAt, end),
                ),
            )
            .orderBy(Problem.createdAt);
    }
}

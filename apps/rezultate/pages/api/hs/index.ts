import type { NextApiRequest, NextApiResponse } from 'next';
import { Elev, Parinte, prisma, Profesor} from '@real/database';
import rateLimit from 'helpers/rateLimit';
import getHsMetrics, { HsProcessed } from 'helpers/getHsMetrics';
import groupHs from 'helpers/groupHs';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await limiter.check(res, 500, 'API_LIMIT_TOKEN');
    }
    catch {
        return res.status(429).json({ message: 'Rate limit exceeded' });
    }

    if (req.method == 'GET') {
        const { filterBy } = req.query;

        const realFilter = filterBy === "real";

        const studentResults = await prisma.elev.findMany({
            ...(!realFilter && {
                select: {
                    hs: true,
                }
            })
        });

        const teachersResults = await prisma.profesor.findMany({
            ...(!realFilter && {
                select: {
                    hs: true,
                }
            })
        });

        const parentResults = await prisma.parinte.findMany({
            ...(!realFilter && {
                select: {
                    hs: true,
                }
            })
        });

        const admissionGrade = await prisma.medieAdmitere.findFirst({
            ...(!realFilter && {
                select: {
                    hs: true,
                }
            })
        });

        const results = [studentResults, teachersResults, parentResults].flat().map(({ hs }) => hs);
        const frequencyResults = results.reduce<{ [key: string]: number }>((acc, hs) => {
            acc[hs] = (acc[hs] ?? 0) + 1;
            return acc;
        }, {});

        if (realFilter) {
            const groupedStudents = groupHs(studentResults);
            const groupedTeachers = groupHs(teachersResults);
            const groupedParents = groupHs(parentResults);

            const groupedResults = Object.keys(frequencyResults).reduce<{ hs: string, real: number, records: number }[]>((acc, hs) => {
                if (groupedStudents[hs]) {
                    const hsScores = getHsMetrics({ elevi: groupedStudents[hs] as Elev[], profesori: groupedTeachers[hs] as Profesor[], parinti: groupedParents[hs] as Parinte[], medieAdmitere: admissionGrade?.medie.toNumber() })
                    const hsRecords = (groupedStudents[hs]?.length || 0) + (groupedTeachers[hs]?.length || 0) + (groupedParents[hs]?.length || 0);

                    acc.push({ hs: hs, real: hsScores.scores.real, records: hsRecords });
                }

                return acc;
            }, []);

            res.status(200).json(groupedResults.sort((a, b) => (b.real - a.real)*0.75 + (b.records - a.records)*0.25));
            return;
        }

        const resultList = Object.keys(frequencyResults).map((hs) => ({ hs, records: frequencyResults[hs] }));

        res.status(200).json(resultList);
        return;
    }

    res.status(405).json({ message: 'Method not allowed' });
    return;
}

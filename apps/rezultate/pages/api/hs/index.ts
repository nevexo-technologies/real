import type { NextApiRequest, NextApiResponse } from 'next';
import { Elev, Parinte, prisma, Profesor } from '@real/database';
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

        if (realFilter) {
            const groupedStudents = groupHs(studentResults);
            const groupedTeachers = groupHs(teachersResults);
            const groupedParents = groupHs(parentResults);

            const groupedResults = Object.keys(groupedStudents).reduce<({ hs: string } & HsProcessed)[]>((acc, hs) => {
                acc.push({ hs: hs, ...getHsMetrics({ elevi: groupedStudents[hs] as Elev[], profesori: groupedTeachers[hs] as Profesor[], parinti: groupedParents[hs] as Parinte[] }) });
                return acc;
            }, []);

            res.status(200).json(groupedResults);
            return;
        }

        const results = [studentResults, teachersResults, parentResults].flat();

        let highschools = [] as { name: string, records: number }[];
        for (let i = 0; i < results.length; i++) {
            if (highschools.length == 0) {
                highschools.push({ name: results[i].hs, records: 1 });
            } else {
                let found = false;
                for (let j = 0; j < highschools.length; j++) {
                    if (highschools[j].name == results[i].hs) {
                        highschools[j].records++;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    highschools.push({ name: results[i].hs, records: 1 });
                }
            }
        }

        res.status(200).json(highschools);
        return;
    }

    res.status(405).json({ message: 'Method not allowed' });
    return;
}

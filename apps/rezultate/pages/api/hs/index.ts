import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@real/database';
import rateLimit from 'helpers/rateLimit';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        await limiter.check(res, 500, 'API_LIMIT_TOKEN');
    }
    catch {
        return res.status(429).json({ message: 'Rate limit exceeded' });
    }

    const studentResults = await prisma.elev.findMany({
        select: {
            hs: true,
        },
    });

    const teachersResults = await prisma.profesor.findMany({
        select: {
            hs: true,
        },
    });

    const parentResults = await prisma.parinte.findMany({
        select: {
            hs: true,
        },
    });

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

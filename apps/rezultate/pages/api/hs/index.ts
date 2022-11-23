import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@real/database';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    //Show all database entries that include highschool
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
    
    let highschools = [] as {name: string, records: number}[];
    for (let i = 0; i < results.length; i++) {
        if (highschools.length == 0) {
            highschools.push({name: results[i].hs, records: 1});
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
                highschools.push({name: results[i].hs, records: 1});
            }
        }
    }

    res.status(200).json(highschools);
    return;
}

import { Elev, prisma, Profesor, Parinte } from '@real/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { highschool } = req.query;
    const excludedKeys = ['id', 'ref', 'email', 'age', 'class', 'letter', 'eth', 'ethFull'];

    const studentResults = await prisma.elev.findMany({
        where: {
            hs: highschool as string,
        },
    });

    const teachersResults = await prisma.profesor.findMany({
        where: {
            hs: highschool as string,
        },
    });

    const parentResults = await prisma.parinte.findMany({
        where: {
            hs: highschool as string,
        },
    });

    function exclude<T extends Elev | Profesor | Parinte>(obj: T[], keys: string[]) : T[] {
        let filteredResults = [] as T[];
        for(let i = 0; i < obj.length; i++) {
            let newObj = {} as T;
            for(let key in obj[i]) {
                if(!keys.includes(key)) {
                    newObj[key] = obj[i][key];
                }
            }
            filteredResults.push(newObj);
        }
        return filteredResults;
    }

    const results = [exclude(studentResults, excludedKeys), exclude(teachersResults as any, excludedKeys), exclude(parentResults as any, excludedKeys)].flat();

    res.status(200).json(results);
    return;
}
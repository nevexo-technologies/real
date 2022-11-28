import { Elev, prisma, Profesor, Parinte } from '@real/database';
import getHsMetrics from 'helpers/getHsMetrics';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { highschool } = req.query;

    try {
        const studentResults = await prisma.elev.findMany({
            where: {
                hs: highschool as string,
            },
        });

        const teacherResults = await prisma.profesor.findMany({
            where: {
                hs: highschool as string,
            },
        });

        const parentResults = await prisma.parinte.findMany({
            where: {
                hs: highschool as string,
            },
        });

        const metrics = getHsMetrics({ elevi: studentResults, profesori: teacherResults, parinti: parentResults });

        res.status(200).json({highschool, ...metrics});
        return;
    } catch (err) {
        res.status(500).json({ message: "Could not fetch metrics" });
        return;
    }
    // function cleanFormData<T extends {}>(formData: T[]): { sum: number, length: number } {
    //     const dataFlattened = formData.map((val, idx) => [...Object.keys(val).map((key) => val[key as keyof T])]).flat()
    //     const dataCleaned = dataFlattened.filter((val) => val != -1);
    //     const dataSum = dataCleaned.reduce((acc, val) => acc + (val as number), 0);

    //     return {
    //         sum: dataSum,
    //         length: dataCleaned.length
    //     }
    // }

    // const { sum: studentSum, length: studentLength } = cleanFormData<typeof studentResults[0]>(studentResults);
    // const { sum: teacherSum, length: teacherLength } = cleanFormData<typeof teacherResults[0]>(teacherResults);
    // const { sum: parentSum, length: parentLength } = cleanFormData<typeof parentResults[0]>(parentResults);

    // const opportunityIndex = (studentSum + teacherSum + parentSum) / (studentLength + teacherLength + parentLength);

    // res.status(200).json('Indicele de oportunitati este: ' + opportunityIndex);
    // return;

    // const studentAverage = studentResults.map((student) => {[key:string]: number}[]
    //     const studentAverage = (student.e10 + student.e11 + student.e12 + student.e13 + student.e14 + student.e15 + student.e16) / 7;
    //     return studentAverage;
    // });



    // const teachersAverage = teacherResults.map((teacher) => {
    //     const teachersAverage = (teacher.p10 + teacher.p11 + teacher.p12);
    //     return teachersAverage;
    // });



    // const parentsAverage = parentResults.map((parent) => {
    //     const parentsAverage = (parent.t10 + parent.t11 + parent.t12);
    //     return parentsAverage;
    // });

    // // average of all the averages
    // const average = (studentAverage.reduce((a, b) => a + b, 0) + teachersAverage.reduce((a, b) => a + b, 0) + parentsAverage.reduce((a, b) => a + b, 0)) / (studentAverage.length + teachersAverage.length + parentsAverage.length);

    // res.status(200).json('Indicele de oportunitati este: ' + average);
    // return;

    // const teachersResults = await prisma.profesor.findMany({
    //     where: {
    //         hs: highschool as string,
    //     },
    // });

    // const parentResults = await prisma.parinte.findMany({
    //     where: {
    //         hs: highschool as string,
    //     },
    // });

    // res.status(200).json("Hello World");
    // return;
}
import { Elev, prisma, Profesor, Parinte } from '@real/database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { highschool } = req.query;

    const indexes = {
        opportunities: {
            students: ["e10", "e11", "e12", "e13", "e14", "e15", "e16"],
            teachers: ["t10", "t11", "t12"],
            parents: ["p10", "p11", "p12"],
        },
        resources: {
            elevi: ["e20", "e22", "e23", "e24", "e24b", "e25", "e25b"],
            teachers: ["p13", "p14"],
        },
        studentCommunity: {
            elevi: ["e32", "e33", "e38", "e39", "e40", "e41", "e43"],
            teachers: ["p12", "p19", "p20", "p22"],
            parents: ["t20"],
        },
        teacherCommunity: {
            elevi: ["e26","e27", "e28", "e29", "e30", "e31" ,"e32", "e33", "e34", "e35", "e37", "e38", "e41"],
            teachers: ["p10", "p11", "p18", "p20"],
            parents: ["t16", "t17", "t19", "t20"],
        },
        inclusivity: {
            elevi: ["e13", "e14","e15", "e16", "e21", "e34", "e35", "e38", "e39", "e41"],
            teachers: ["p10", "p11"],
            parents: ["t19"],
        },
    }

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

    function cleanFormData<T extends {}>(formData: T[]): { sum: number, length: number } {
        const dataFlattened = formData.map((val, idx) => [...Object.keys(val).map((key) => val[key as keyof T])]).flat()
        const dataCleaned = dataFlattened.filter((val) => val != -1);
        const dataSum = dataCleaned.reduce((acc, val) => acc + (val as number), 0);

        return {
            sum: dataSum,
            length: dataCleaned.length
        }
    }

    const { sum: studentSum, length: studentLength } = cleanFormData<typeof studentResults[0]>(studentResults);
    const { sum: teacherSum, length: teacherLength } = cleanFormData<typeof teacherResults[0]>(teacherResults);
    const { sum: parentSum, length: parentLength } = cleanFormData<typeof parentResults[0]>(parentResults);


    console.log(studentSum, studentLength);
    const opportunityIndex = (studentSum + teacherSum + parentSum) / (studentLength + teacherLength + parentLength);

    res.status(200).json('Indicele de oportunitati este: ' + opportunityIndex);
    return;

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
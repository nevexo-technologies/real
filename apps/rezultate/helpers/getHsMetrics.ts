import type { NextApiRequest, NextApiResponse } from 'next';
import { Elev, prisma, Profesor, Parinte } from '@real/database';

const INDEXES = {
    opportunities: {
        students: ["e10", "e11", "e12", "e13", "e14", "e15", "e16"],
        teachers: ["t10", "t11", "t12"],
        parents: ["p10", "p11", "p12"],
    },
    resources: {
        students: ["e20", "e22", "e23", "e24", "e24b", "e25", "e25b"],
        teachers: ["p13", "p14"],
        parents: [],
    },
    studentCommunity: {
        students: ["e32", "e33", "e38", "e39", "e40", "e41", "e43"],
        teachers: ["p12", "p19", "p20", "p22"],
        parents: ["t20"],
    },
    teacherCommunity: {
        students: ["e26", "e27", "e28", "e29", "e30", "e31", "e32", "e33", "e34", "e35", "e37", "e38", "e41"],
        teachers: ["p10", "p11", "p18", "p20"],
        parents: ["t16", "t17", "t19", "t20"],
    },
    inclusivity: {
        students: ["e13", "e14", "e15", "e16", "e21", "e34", "e35", "e38", "e39", "e41"],
        teachers: ["p10", "p11"],
        parents: ["t19"],
    },
}

interface IHsMetrics {
    opportunities: number,
    resources: number,
    studentCommunity: number,
    teacherCommunity: number,
    inclusivity: number
}

function cleanFormData<T extends {}>(formData: T[], acceptedKeys: string[]): { sum: number, length: number } {
    if (formData?.length === 0) {
        return {
            sum: 0,
            length: 0
        }
    }

    const dataFlattened = formData.map((val, idx) => [...Object.keys(val).map((key) => {
        if (acceptedKeys.includes(key)) {
            const multipleChoice = String(val[key as keyof T]).split(",");
            if (multipleChoice?.length > 1) {
                const allChoices = multipleChoice.map((val) => parseInt(val));

                if (allChoices.includes(0)) {
                    return 1;
                }

                return 0;
            }

            const fieldValue = Number(val[key as keyof T]) / 5
            return fieldValue > 1 ? 1 : fieldValue;
        }
        return;
    })
    ]).flat()
    const dataCleaned = dataFlattened.filter((val) => val != undefined && val != -1);

    const dataSum = dataCleaned.reduce((acc, val) => (acc as number) + (val as number), 0);

    return {
        sum: dataSum as number,
        length: dataCleaned.length
    }
}

export default function getHsMetrics({ elevi, parinti, profesori }: { elevi: Elev[], parinti: Parinte[], profesori: Profesor[] }): IHsMetrics {

    const metrics = Object.keys(INDEXES).reduce<IHsMetrics>((acc, metric) => {
        const allowedKeys = INDEXES[metric as keyof IHsMetrics];
        const { sum: studentSum, length: studentLength } = cleanFormData<typeof elevi[0]>(elevi, allowedKeys.students);
        const { sum: teacherSum, length: teacherLength } = cleanFormData<typeof profesori[0]>(profesori, allowedKeys.teachers);
        const { sum: parentSum, length: parentLength } = cleanFormData<typeof parinti[0]>(parinti, allowedKeys.parents);

        const selectedIndex = (studentSum + teacherSum + parentSum) / (studentLength + teacherLength + parentLength);
        return { ...acc, [metric as keyof IHsMetrics]: (selectedIndex * 10).toFixed(2) }
    }, {
        opportunities: 0,
        resources: 0,
        studentCommunity: 0,
        teacherCommunity: 0,
        inclusivity: 0
    });

    return metrics;

    // // extract database entries based off of the indexes
    // const opportunities = data.filter((val) => {
    //     return ["e10", "e11", "e12", "e13", "e14", "e15", "e16", "t10", "t11", "t12", "p10", "p11", "p12"].includes(val.hsIndex);
    // }
    // );
    // const resources = data.filter((val) => {
    //     return ["e20", "e22", "e23", "e24", "e24b", "e25", "e25b", "p13", "p14"].includes(val.hsIndex);
    // }
    // );
    // const studentCommunity = data.filter((val) => {
    //     return ["e32", "e33", "e38", "e39", "e40", "e41", "e43", "p12", "p19", "p20", "p22", "t20"].includes(val.hsIndex);
    // }
    // );
    // const teacherCommunity = data.filter((val) => {
    //     return ["e26", "e27", "e28", "e29", "e30", "e31", "e32", "e33", "e34", "e35", "e37", "e38", "e41", "p10", "p11", "p18", "p20", "t16", "t17", "t19", "t20"].includes(val.hsIndex);
    // }
    // );
    // const inclusivity = data.filter((val) => {
    //     return ["e13", "e14", "e15", "e16", "e21", "e34", "e35", "e38", "e39", "e41", "p10", "p11", "t19"].includes(val.hsIndex);
    // }
    // );
    //
    // // calculate the average for each category
    // const opportunitiesAvg = opportunities.reduce((acc, val) => acc + (val.hsValue as number), 0) / opportunities.length;
    // const resourcesAvg = resources.reduce((acc, val) => acc + (val.hsValue as number), 0) / resources.length;
    // const studentCommunityAvg = studentCommunity.reduce((acc, val) => acc + (val.hsValue as number), 0) / studentCommunity.length;
    // const teacherCommunityAvg = teacherCommunity.reduce((acc, val) => acc + (val.hsValue as number), 0) / teacherCommunity.length;
    // const inclusivityAvg = inclusivity.reduce((acc, val) => acc + (val.hsValue as number), 0) / inclusivity.length;
    //
    // // return the metrics
    // return {
    //     opportunities: opportunitiesAvg,
    //     resources: resourcesAvg,
    //     studentCommunity: studentCommunityAvg,
    //     teacherCommunity: teacherCommunityAvg,
    //     inclusivity: inclusivityAvg
    // }

}


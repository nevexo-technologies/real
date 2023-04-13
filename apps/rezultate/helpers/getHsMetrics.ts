import { Elev, Profesor, Parinte } from '@real/database';

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
    inclusivity: number,
}

export interface HsProcessed {
    scores: {
        resources: number;
        opportunities: number;
        studentCommunity: number;
        teacherCommunity: number;
        inclusivity: number;
        real: number;
    }
    facilities: string[];
}

export default function getHsMetrics({ elevi, parinti, profesori }: { elevi: Elev[], parinti: Parinte[], profesori: Profesor[] }) : HsProcessed {
    const facilitiesUnfiltered = elevi.reduce<{ e19: string[], e21: string[] }>((acc, { e19, e21 }) => {
        return {
            e19: [...acc.e19, ...e19.split(",")],
            e21: [...acc.e21, ...e21.split(",")]
        }
    }, { e19: [], e21: [] });
    const a01 = (new Set(facilitiesUnfiltered.e19).size + new Set(facilitiesUnfiltered.e21).size) * 0.4;

    const e19Values = ["Bănci", "Scaune", "Catedră", "Spații de depozitare", "Tablă", "Aer condiționat", "Calculatoare", "Laboratoare", "Automat cu mâncare"];
    const e21Values = ["Cretă/Markere", "Săpun", "Hârtie igienică", "Dezinfectant", "Burete pentru tablă", "Consumabile pentru laboratoare (de exemplu, reactivi pentru laboratorul de chimie etc.)"];
    const facilitiesFitered = {
        e19: Array.from(new Set(facilitiesUnfiltered.e19)).map((val) => e19Values[Number(val)]),
        e21: Array.from(new Set(facilitiesUnfiltered.e21)).map((val) => e21Values[Number(val)]),
    }

    const metrics = Object.keys(INDEXES).reduce<IHsMetrics>((acc, metric) => {
        const allowedKeys = INDEXES[metric as keyof IHsMetrics];
        const { sum: studentSum, length: studentLength } = cleanFormData<typeof elevi[0]>(elevi, allowedKeys.students);
        const { sum: teacherSum, length: teacherLength } = cleanFormData<typeof profesori[0]>(profesori, allowedKeys.teachers);
        const { sum: parentSum, length: parentLength } = cleanFormData<typeof parinti[0]>(parinti, allowedKeys.parents);

        const selectedIndex = (studentSum + teacherSum + parentSum) / (studentLength + teacherLength + parentLength);
        return { ...acc, [metric]: (selectedIndex * 10) }
    }, {
        opportunities: 0,
        resources: 0,
        studentCommunity: 0,
        teacherCommunity: 0,
        inclusivity: 0
    });

    const officePoint = 1;
    const facilitiesPoints = (facilitiesFitered.e19.length + facilitiesFitered.e21.length)*0.5;
    const subjectivePoints = Object.values(metrics).reduce((acc, val) => acc + val, 0) / Object.keys(metrics).length;
    const realScore = officePoint*0.10 + facilitiesPoints*0.15 + subjectivePoints;

    return {
        scores: {
            real: realScore,
            ...metrics,
            resources: (metrics.resources + a01) > 10 ? 10 : (metrics.resources + a01),
        },
        facilities: [...facilitiesFitered.e19, ...facilitiesFitered.e21]
    }
}

function cleanFormData<T extends {}>(formData: T[], acceptedKeys: string[]): { sum: number, length: number } {
    if (!formData || formData?.length === 0) {
        return {
            sum: 0,
            length: 0
        }
    }

    const dataFlattened = formData.map((val, idx) => [...Object.keys(val).filter(key=>acceptedKeys.includes(key)).map((key) => {
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
    })
    ]).flat();

    const dataCleaned = dataFlattened.filter((val) => val != undefined && val >= 0);
    const dataSum = dataCleaned.reduce((acc, val) => acc + val, 0);

    return {
        sum: dataSum,
        length: dataCleaned.length > 0 ? dataCleaned.length : 1
    }
}


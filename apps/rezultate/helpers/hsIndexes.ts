import type { NextApiRequest, NextApiResponse } from 'next';
import { Elev, prisma, Profesor, Parinte } from '@real/database';

interface IHsMetrics {
    opportunities: number,
    resources: number,
    studentCommunity: number,
    teacherCommunity: number,
    inclusivity: number
  }
  
  function getHsMetrics(data: (Elev | Profesor | Parinte)[]) : IHsMetrics{
//extract database entries based off of the indexes
    const opportunities = data.filter((val) => {
        return ["e10", "e11", "e12", "e13", "e14", "e15", "e16", "t10", "t11", "t12", "p10", "p11", "p12"].includes(val.hsIndex);
        }
    );
    const resources = data.filter((val) => {
        return ["e20", "e22", "e23", "e24", "e24b", "e25", "e25b", "p13", "p14"].includes(val.hsIndex);
        }
    );
    const studentCommunity = data.filter((val) => {
        return ["e32", "e33", "e38", "e39", "e40", "e41", "e43", "p12", "p19", "p20", "p22", "t20"].includes(val.hsIndex);
        }
    );
    const teacherCommunity = data.filter((val) => {
        return ["e26","e27", "e28", "e29", "e30", "e31" ,"e32", "e33", "e34", "e35", "e37", "e38", "e41", "p10", "p11", "p18", "p20", "t16", "t17", "t19", "t20"].includes(val.hsIndex);
        }
    );
    const inclusivity = data.filter((val) => {
        return ["e13", "e14","e15", "e16", "e21", "e34", "e35", "e38", "e39", "e41", "p10", "p11", "t19"].includes(val.hsIndex);
        }
    );
//calculate the average for each category
    const opportunitiesAvg = opportunities.reduce((acc, val) => acc + (val.hsValue as number), 0) / opportunities.length;
    const resourcesAvg = resources.reduce((acc, val) => acc + (val.hsValue as number), 0) / resources.length;
    const studentCommunityAvg = studentCommunity.reduce((acc, val) => acc + (val.hsValue as number), 0) / studentCommunity.length;
    const teacherCommunityAvg = teacherCommunity.reduce((acc, val) => acc + (val.hsValue as number), 0) / teacherCommunity.length;
    const inclusivityAvg = inclusivity.reduce((acc, val) => acc + (val.hsValue as number), 0) / inclusivity.length;
//return the metrics
    return {
        opportunities: opportunitiesAvg,
        resources: resourcesAvg,
        studentCommunity: studentCommunityAvg,
        teacherCommunity: teacherCommunityAvg,
        inclusivity: inclusivityAvg
    }
    
  }


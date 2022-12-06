import { Elev, Parinte, Profesor } from "@real/database";

export default function groupHs(data: (Elev | Parinte | Profesor)[]) {
    return data.reduce<{ [key: string]: typeof data }>((acc, curr) => {
        if (acc[curr.hs]) acc[curr.hs].push(curr);
        else acc[curr.hs] = [curr];

        return acc;
    }, {});
}
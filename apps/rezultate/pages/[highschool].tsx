import Layout from "@components/Layout";
import { useRouter } from "next/router";


export default function HighschoolPage() {
    const { highschool } = useRouter().query;

    return (
        <Layout>
            Highshool {highschool}
        </Layout>
    )
}
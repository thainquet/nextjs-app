import Link from "next/link";
import Head from "next/head"

export default function FirstPost() {
    return <>
    <Head>
        <title>Posttt</title>
    </Head>
        <h1>first post</h1>
        <div><Link href="/">Go back</Link></div>
    </>
}
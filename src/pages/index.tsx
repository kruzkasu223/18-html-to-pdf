import { type NextPage } from "next"
import Head from "next/head"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  const { data } = api.example.hello.useQuery({ text: "18/27 - HTML to PDF" })

  console.log("hello", data?.greeting)

  return (
    <>
      <Head>
        <title>18/27 - HTML to PDF</title>
      </Head>
      <main
        data-theme="luxury"
        className="flex min-h-screen flex-col gap-4 text-center"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          18/27 - HTML to PDF
        </h1>
      </main>
    </>
  )
}

export default Home

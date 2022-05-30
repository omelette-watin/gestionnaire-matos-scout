import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pre-configured Next.js</title>
      </Head>
      <div className="m-auto flex min-h-screen w-fit flex-col space-y-8 pt-20">
        <h1 className="text-3xl font-black">
          Welcome to your pre-configured{" "}
          <span className="text-sky-400">Next.js</span> app !
        </h1>
        <div className="space-y-8 px-4">
          <h2 className="text-xl font-bold">Features :</h2>
          <ul className="font-semibold">
            <li>- Typescript</li>
            <li>- Eslint & Prettier</li>
            <li>- Basic Folder structure</li>
            <li>- TailwindCSS, PostCSS & autoprefixer</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home

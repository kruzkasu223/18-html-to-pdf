import { type NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { Loading } from "~/Loading"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  const [htmlText, setHtmlText] = useState("")
  const [error, setError] = useState(false)

  const HTMLtoPDFMutation = api.HTMLtoPDF.html.useMutation({
    onSuccess(data) {
      setError(false)
      const binary = atob(data.pdfBase64.replace(/\s/g, ""))
      const len = binary.length
      const buffer = new ArrayBuffer(len)
      const view = new Uint8Array(buffer)
      for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i)
      }
      const file = new Blob([view], { type: "application/pdf" })
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)
    },
    onError() {
      setError(true)
    },
  })

  const handleConvert = () => {
    if (!htmlText) return setError(true)
    HTMLtoPDFMutation.mutate({ text: htmlText })
  }

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
        <p>
          (this project only works locally due to puppeteer&apos;s issue on edge
          servers.)
        </p>
        <Loading loading={HTMLtoPDFMutation.isLoading} />
        <div className="m-auto max-w-7xl">
          <div className="flex flex-col gap-8">
            {error && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! Something Went Wrong.</span>
                </div>
              </div>
            )}

            <textarea
              className="textarea-accent textarea font-mono"
              placeholder="Enter some valid HTML..."
              rows={20}
              cols={80}
              value={htmlText}
              onChange={(e) => {
                setError(false)
                setHtmlText(e.target.value || "")
              }}
            ></textarea>

            <button
              onClick={handleConvert}
              className="btn-outline btn-accent btn"
              disabled={!htmlText}
            >
              Convert
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home

import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import puppeteer from "puppeteer"

export const HTMLtoPDFRouter = createTRPCRouter({
  html: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      if (!input.text) throw Error("invalid input")

      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      const html = input.text
      await page.setContent(html, { waitUntil: "domcontentloaded" })
      const pdf = await page.pdf({
        path: "result.pdf",
        margin: { top: "50px", right: "25px", bottom: "50px", left: "25px" },
        printBackground: true,
        format: "A4",
      })
      const pdfBase64 = pdf.toString("base64")
      await browser.close()

      return {
        pdfBase64: pdfBase64,
      }
    }),
})

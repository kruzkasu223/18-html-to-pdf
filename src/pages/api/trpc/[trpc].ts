import { createNextApiHandler } from "@trpc/server/adapters/next"
import { createTRPCContext } from "~/server/api/trpc"
import { appRouter } from "~/server/api/root"

const NODE_ENV = "development" // this should be env var

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          )
        }
      : undefined,
})

// // import { initEdgeStore } from "@edgestore/server";
// import { initEdgeStore } from "@edgestore/server";
// import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
// import { z } from "zod";


// const es = initEdgeStore.create();

// const edgeStoreRouter = es.router({
//   publicFiles: es
//     .fileBucket({
//       maxSize: 1024 * 1024 * 1,
//     })
//   //   .input(
//   //     z.object({
//   //       type: z.enum(["post", "profile"]),
//   //     })
//   //   )
//   //   .path(({ input }) => [{ type: input.type }]),
//   // myProtectedFiles: es
//   //   .fileBucket()
//   //   // e.g. /123/my-file.pdf
//   //   .path(({ ctx }) => [{ owner: ctx.userId }])
//   //   .accessControl({
//   //     OR: [
//   //       {
//   //         userId: { path: "owner" },
//   //       },
//   //       {
//   //         userRole: { eq: "admin" },
//   //       },
//   //     ],
//   //   }),
// });

// const handler = createEdgeStoreNextHandler({
//   router: edgeStoreRouter,
//   accessKey: process.env.EDGE_STORE_ACCESS_KEY,
//   secretKey: process.env.EDGE_STORE_SECRET_KEY,
// });

// module.exports = { GET: handler, POST: handler };

import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

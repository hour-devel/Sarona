// "use client";
// import { EdgeStoreRouter } from "../app/api/edgestore/[...edgestore]/route";
// import { createEdgeStoreProvider } from "@edgestore/react";
// const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider();
// export { EdgeStoreProvider, useEdgeStore };
'use client';
import { createEdgeStoreProvider } from '@edgestore/react';

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider();

export { EdgeStoreProvider, useEdgeStore };

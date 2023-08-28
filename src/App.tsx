import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import "./index.scss";
import InventoryOverview from "./routes/InventoryOverview";

let router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({}),
    Component() {
      return <InventoryOverview></InventoryOverview>;
    },
  },
  {
    path: "/test",
    loader: () => ({ message: "Hello Data test!" }),
    Component() {
      let data = useLoaderData() as { message: string };
      return <h1>{data.message}</h1>;
    },
  },
], { basename: "/gcandon/" });

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
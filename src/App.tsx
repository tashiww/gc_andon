import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import "./index.scss";
import "./App.css";
import InventoryOverview from "./routes/InventoryOverview";
import React from "react";
import ConnectionToggle from "./components/ConnectionToggle";
import {Debug} from "./types/GCDebug"
import ItemList from "./components/ItemList";

export default function App() {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [gameData, setGameData] = React.useState<any>()
  const [refresh, setRefresh] = React.useState(true)
  
  let router = createBrowserRouter([
    {
      path: "/",
      loader: () => ({}),
      errorElement: <ErrorBoundary />,
      element: <InventoryOverview connectionToggler={toggleRefresh} connected={connectionStatus}></InventoryOverview>,
    }, 
    {
      path: "/test",
      loader: () => ({ message: "Hello Data test!" }),
      element: (<div><h1>foo</h1><p>I don't think this worked</p></div>)
    },
    {
      path: "/inventory",
      loader: () => ({ message: "Hello Data test!" }),
      element: (<div><h1>foo</h1><p>I don't think this worked</p><ItemList data={gameData} /><ConnectionToggle clickHandler={toggleRefresh} connected={connectionStatus}/></div>)
    },
  ], { basename: "/gcandon/",  });
  
  function toggleRefresh() {
    setRefresh((prevState) => !prevState);
    console.log("i tried to toggle!");
  }

  async function getData() {
    try {
    const response = await fetch('http://127.0.0.1:51274/debug');

    const jsonData = await response.json();
    const entityArray: Debug[] = Object.values(jsonData);
   
    const pallets = entityArray.filter(entity => entity.hasOwnProperty("CourierPalletComponent"));
    const mats_mods = pallets[0].InventoryComponent?.Slots.filter(obj => obj.ContentType === 2);


      setConnectionStatus(response.ok);

    return mats_mods;
    }
    catch {
      console.error('borked');
      return null;
    }
  }
  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (refresh) {
      timer = setInterval(() => { 
        const promiseData = getData(); 
        console.log('refreshed'); 
        promiseData?.then((data) => { 
              setGameData(data);
              console.log(data); });

    }, 5000);
    }
    else {
      setConnectionStatus(false);
    }
    return () => {
      clearInterval(timer);
    }
  }, [refresh]);

  function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return <div>Dang!</div>;
  }
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
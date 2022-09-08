import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [windowDimenion, setWindowDimensions] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    setWindowDimensions({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);


  return (
    <div>
      <div className="md:hidden p-10">
        {windowDimenion.winHeight > 768 ? (
          <div className="flex flex-col items-center">
            <img src="./assets/images/rotate.png" alt="rotate" />

            <h1 className="font-bold text-7xl text-white">OPS!!</h1>
            <h2 className="font-bold text-white text-center mt-8 max-w-[350px] mx-auto">
              you need to rotate your device to let work properly the web app
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center  ">
            <img
              className="w-56 h-56"
              src="./assets/images/broken-heart.png"
              alt="broken-heart"
            />
            <h1 className="font-bold text-7xl text-white">SIGH!!</h1>
            <h2 className="font-bold text-white text-center mt-8 max-w-[350px] mx-auto">
              we are really sorry, but your device size is not supported by this
              web app
            </h2>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

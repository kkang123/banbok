"use client";

import { Toaster } from "react-hot-toast";

import { Title } from "./Title";

const Home = () => {
  return (
    <main className="w-full">
      <div className="min-h-screen overflow-x-hidden">
        <div className="flex flex-col md:min-w-max">
          <Title />
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
};

export default Home;

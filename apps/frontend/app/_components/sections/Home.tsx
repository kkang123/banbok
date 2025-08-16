"use client";

import { Title } from "./Title";
import { CodeUrlInput } from "./CodeUrlInput";
import { useScrollPosition } from "../../_hooks/useScrollPosition";

const Home = () => {
  const activeSection = useScrollPosition();

  const scrollToNextSection = () => {
    const sections = [
      document.getElementById("title-section"),
      document.getElementById("input-section"),
    ].filter((section): section is HTMLElement => section !== null);

    if (activeSection < sections.length - 1) {
      sections[activeSection + 1].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="w-full">
      {/* 모바일에서는 스크롤 가능하도록 수정 */}
      <div className="min-h-screen overflow-x-hidden">
        {/* 모바일에서는 수직으로 쌓이도록 변경 */}
        <div className="flex flex-col md:min-w-max">
          <Title
            isActive={activeSection === 0}
            onClick={scrollToNextSection}
            id="title-section"
          />
          <CodeUrlInput
            isActive={activeSection === 1}
            onClick={scrollToNextSection}
            id="input-section"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;

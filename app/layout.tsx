import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;

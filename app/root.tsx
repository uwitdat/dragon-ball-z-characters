import React, { ReactElement } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";
import NavBar from "./components/nav";
import DBZ_LOGO from "./assets/dbzlogo.png";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: DBZ_LOGO, type: "image/png" },
  ];
}

export default function App() {
  return (
    <Document>
      <NavBar />
      <Outlet />
    </Document>
  );
}

interface DocumentProps {
  children: ReactElement[];
}

const Document: React.FC<DocumentProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="relative">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

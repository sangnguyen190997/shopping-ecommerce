import React, { Fragment } from "react";
import Chat from "../components/Chat/Chat";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <div>{children}</div>
      <Chat />
      <Footer />
    </Fragment>
  );
}

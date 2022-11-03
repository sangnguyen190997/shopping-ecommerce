import React, { Fragment } from "react";
import HeaderAdmin from "../components/Admin/HeaderAdmin";
import MenuAdmin from "../components/Admin/MenuAdmin";

export default function AdminLayout({ children }) {
  return (
    <Fragment>
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <HeaderAdmin />
        <MenuAdmin />
        <div>{children}</div>
      </div>
    </Fragment>
  );
}

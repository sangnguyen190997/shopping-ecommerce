import Chat from "../components/Admin/Chat";
import HistoryAdmin from "../components/Admin/HistoryAdmin";
import HomeAdmin from "../components/Admin/HomeAdmin";
import ProductsAdmin from "../components/Admin/ProductsAdmin";
import UsersAdmin from "../components/Admin/UsersAdmin";

const adminRoutes = [
  {
    path: "/admin",
    component: HomeAdmin,
  },
  {
    path: "/chat",
    component: Chat,
  },
  {
    path: "/users",
    component: UsersAdmin,
  },
  {
    path: "/products",
    component: ProductsAdmin,
  },
  {
    path: "/history",
    component: HistoryAdmin,
  },
];

export default adminRoutes;

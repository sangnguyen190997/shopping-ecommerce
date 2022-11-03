import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from "redux-persist/integration/react";
import publicRoutes from "./Routes/routes";
import DefaultLayout from "./Layouts/DefaultLayout";
import HeaderAdmin from "./components/Admin/HeaderAdmin";
import adminRoutes from "./Routes/adminRoutes";
import AdminLayout from "./Layouts/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <DefaultLayout>
                        <Component />
                      </DefaultLayout>
                    }
                  ></Route>
                );
              })}
              {adminRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <AdminLayout>
                        <Component />
                      </AdminLayout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

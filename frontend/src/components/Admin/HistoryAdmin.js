import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListHistoryUser } from "../../services/API/historyApi";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function HistoryAdmin() {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.history?.listHistory);
  const [text, setText] = useState("");

  useEffect(() => {
    getListHistoryUser(dispatch);
  }, []);

  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_order
    socket.on("receive_order", (data) => {
      setText("User ID: " + data + " Vừa Đặt Hàng");

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    });
  }, []);
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      History
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">History</h4>
                <h3>{text}</h3>
                <input
                  className="form-control w-25"
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {histories?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.idUser}</td>
                          <td>{item.fullname}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td>{item.total}</td>
                          <td>
                            {item.delivery
                              ? "Đã Vận Chuyển"
                              : "Chưa Vận Chuyển"}
                          </td>
                          <td>
                            {item.status ? "Đã Thanh Toán" : "Chưa Thanh Toán"}
                          </td>
                          <td>
                            <a
                              style={{ cursor: "pointer", color: "white" }}
                              className="btn btn-success"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="">Nguyễn Sang</a>.
      </footer>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getListUser } from "../../services/API/userApi";

export default function UsersAdmin() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const listUser = useSelector((state) => state.user.users.isUser);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getListUser(dispatch, user.token);
  }, [load]);

  const handleDeleteUser = async (id) => {
    await deleteUser(dispatch, id, user.token);
    setLoad(!load);
  };
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
                      Home
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
                <h4 className="card-title">Users</h4>
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
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>User Type</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUser.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              {user.admin == 1 ? "Quản Trị" : "Khách Hàng"}
                            </td>
                            <td>
                              <button
                                style={{ cursor: "pointer", color: "white" }}
                                className="btn btn-danger"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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
        <a href="">Sang Nguyen</a>.
      </footer>
    </div>
  );
}

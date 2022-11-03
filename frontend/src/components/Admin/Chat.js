import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { createMessage, getListMessage } from "../../services/API/messengerApi";
import queryString from "query-string";
import { getListUser } from "../../services/API/userApi";
import moment from "moment";
const socket = io("http://localhost:3000");

export default function Chat() {
  const [load, setLoad] = useState(false);
  const [text, setText] = useState("");
  const AdminId = 5;
  const dispatch = useDispatch();
  const [idUser2, setIdUser2] = useState("");
  const listMessage = useSelector(
    (state) => state.messenger.listmessage.messages
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const users = useSelector((state) => state.user.users.isUser);

  const userWithoutAdmin = users.filter((user) => user.id !== AdminId);

  const handleGetUserId = (id) => {
    setIdUser2(id);
  };

  useEffect(() => {
    getListUser(dispatch, user.token);
  }, [load]);

  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("receive_message", (data) => {
      //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
      setLoad(true);
    });
  }, []);

  useEffect(() => {
    const data = {
      senderId: AdminId,
      receiverId: idUser2,
    };
    const query = "?" + queryString.stringify(data);
    getListMessage(dispatch, query);

    setLoad(false);
  }, [load, idUser2]);

  const handleSend = async () => {
    if (!idUser2) {
      return;
    }

    const data = {
      senderId: AdminId,
      receiverId: idUser2,
      content: text,
      category: "sender",
    };

    socket.emit("send_message", data);
    createMessage(dispatch, data);
    setLoad(true);
    setText("");
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Chat
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Apps
                  </li>
                  <li
                    className="breadcrumb-item text-muted"
                    aria-current="page"
                  >
                    Chat
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-lg-3 col-xl-2 border-right">
                  <div className="card-body border-bottom">
                    <form>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search Contact"
                      />
                    </form>
                  </div>
                  <div
                    className="scrollable position-relative"
                    style={{ height: "calc(100vh - 111px)" }}
                  >
                    <ul className="mailbox list-style-none">
                      <li>
                        <div className="message-center">
                          {userWithoutAdmin.map((value, index) => (
                            <a
                              key={index}
                              className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                              onClick={() => handleGetUserId(value.id)}
                            >
                              <div className="user-img">
                                {" "}
                                <img
                                  src="https://picsum.photos/50/50"
                                  alt="user"
                                  className="img-fluid rounded-circle"
                                  width="40px"
                                />{" "}
                                <span className="profile-status away float-right"></span>
                              </div>
                              <div className="w-75 d-inline-block v-middle pl-2">
                                <h6 className="message-title mb-0 mt-1">
                                  {value.fullname}
                                </h6>
                                <span className="font-12 text-nowrap d-block text-muted text-truncate">
                                  Online
                                </span>
                                <span className="font-12 text-nowrap d-block text-muted">
                                  {moment(value.createdAt).format(
                                    "DD-MM-YYYY hh:mm:ss"
                                  )}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9  col-xl-10">
                  <div
                    className="chat-box scrollable position-relative"
                    style={{ height: "calc(100vh - 111px)" }}
                  >
                    <ul className="chat-list list-style-none px-3 pt-3">
                      {listMessage?.map((value, index) =>
                        value.category === "sender" ? (
                          <li
                            className="chat-item odd list-style-none mt-3"
                            key={index}
                          >
                            <div className="chat-content text-right d-inline-block pl-3">
                              <div className="box msg p-2 d-inline-block mb-1">
                                You: {value.content}
                              </div>
                              <p className="bg-white text-dark text-sm font-10">
                                {moment(value.createdAt).fromNow()}
                              </p>
                              <br />
                            </div>
                          </li>
                        ) : (
                          <li
                            className="chat-item list-style-none mt-3"
                            key={index}
                          >
                            <div className="chat-img d-inline-block">
                              <img
                                src="https://picsum.photos/50/50"
                                alt="user"
                                className="rounded-circle"
                                width="45"
                              />
                            </div>
                            <div className="chat-content d-inline-block pl-3">
                              <h6 className="font-weight-medium">
                                {value.name}
                              </h6>
                              <div className="msg p-2 d-inline-block mb-1">
                                {value.content}
                              </div>
                              <div className="chat-time d-block font-10 m-0 mb-3">
                                {moment(value.createdAt).fromNow()}
                              </div>
                              {/* <p className="bg-white text-dark text-sm">
                                {moment(value.createdAt).fromNow()}
                              </p> */}
                            </div>
                            {/* <div className="chat-time d-block font-10 mr-0 mb-3">
                              {moment(value.createdAt).fromNow()}
                            </div> */}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="card-body border-top">
                    <div className="row">
                      <div className="col-11">
                        <div className="input-field mt-0 mb-0">
                          <input
                            id="textarea1"
                            placeholder="Type and enter"
                            className="form-control border-0"
                            type="text"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                          />
                        </div>
                      </div>
                      <div className="col-1" onClick={handleSend}>
                        <button className="btn btn-success text-white text-center">
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center">
        All Rights Reserved by Adminmart. Designed and Developed by{" "}
        <a href="https://www.facebook.com/sangnguyen1909">Sang Nguyen</a>.
      </footer>
    </div>
  );
}

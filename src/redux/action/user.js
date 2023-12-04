import { message } from "antd";
import { https } from "../../service/config";
import { SET_INFO } from "../constant/user";

export let loginAction = (values, onNavigate) => {
  return (dispatch) => {
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFO", dataJson);
        message.success("Login thành công");
        dispatch({
          type: SET_INFO,
          payload: res.data.content,
        });
        onNavigate("/");
      })
      .catch((err) => {
        message.error("Login redux thunk thất bại");
      });
  };
};

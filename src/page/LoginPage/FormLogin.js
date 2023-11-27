import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../service/config";
import { useDispatch } from "react-redux";
import { SET_INFO } from "../../redux/constant/user";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        // đẩy data xuống localStorage để khi user load trang thì thông tin đăng nhập vẫn còn
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFO", dataJson);

        message.success("Login thành công");
        // chuyển hướng về trang chủ
        navigate("/");
        // đẩy thông tin user lên redux
        dispatch({
          type: SET_INFO,
          payload: res.data.content,
        });
      })
      .catch((err) => {
        message.error("Đã có lỗi xảy ra");
        console.log(err);
      });
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Tài khoản không được bỏ trống",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Mật khẩu không được bỏ trống",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          className="bg-orange-600 hover:text-white hover:border-transparent"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormLogin;
// 13123  Test@13000

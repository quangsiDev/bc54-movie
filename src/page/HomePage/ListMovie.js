import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { https } from "../../service/config";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TURN_OFF, TURN_ON } from "../../redux/constant/spinner";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  // useDispatch ~ mapDispatchToProps ~ Đẩy data lên redux
  let dispatch = useDispatch();

  useEffect(() => {
    // axios({
    //   url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
    //   method: "GET",
    //   headers: {
    //     TokenCybersoft:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjE4LzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMzM5ODQwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzEzNTQ2MDAwfQ.4A7jJib1YUkmnIr-QDcjs_3j1YY0Ft1wPZDfe8qFrqE",
    //   },
    // })
    // bật loading
    dispatch({
      type: TURN_ON,
    });
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
      .then((res) => {
        dispatch({
          type: TURN_OFF,
        });
        setMovieArr(res.data.content);
      })
      .catch((err) => {
        dispatch({
          type: TURN_OFF,
        });
        console.log(err);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 container">
      {movieArr.map((item, index) => {
        return (
          <Card
            key={index}
            hoverable
            style={{
              width: "100%",
            }}
            cover={<img alt="example" src={item.hinhAnh} />}
          >
            <Meta title={item.tenPhim} description="www.instagram.com" />
            <NavLink
              to={`/detail/${item.maPhim}`}
              className="px-5 py-2 rounded border-2 border-red-500 block text-center"
            >
              Xem chi tiết
            </NavLink>
          </Card>
        );
      })}
    </div>
  );
}

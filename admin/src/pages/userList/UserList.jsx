import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [newUsers, setNewUsers] = useState([]);
  // let newuserslength = newUsers.length;

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2RlNzBlNmFlNDIwNDQxNDY3MWM1ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwOTU2NjA2OSwiZXhwIjoxNzA5OTk4MDY5fQ.Xx8Gq1MyHgW_qh-g3oeyFqzEr2dPGeURY7VXhOpMV0o",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        const username = params.row.email.split("@")[0];
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              alt=""
            />
            <span>{username}</span>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const rows = newUsers.map((row) => ({ ...row, id: row._id }));
  return (
    <div className="userList">
      {/* {console.log("Ye h data" + data)} */}
      {console.log("Ye h newUsers" + newUsers)}

      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

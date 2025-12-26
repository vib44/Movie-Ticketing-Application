import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTheatresForAdmin   , updateTheatre } from "../../backend/theatre";
import { message, Table, Button } from "antd";
const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const response = await getAllTheatresForAdmin();
      if (response.success) {
        const allTheatres = response.data;
        setTheatres(allTheatres);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableHeadings = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (value, record) => {
        return record.owner ? record.owner.name : "NA";
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value, record, index) => {
        if (record.isActive) return "Approved";
        return "Pending / Blocked";
      },
    },
    {
      title: "Action",
      render: (value, record, index) => {
        return (
          <div className="d-flex gap-10">
            {record.isActive ? (
              <Button
                onClick={() => {
                  handleStatusChange(record);
                }}
                color="danger"
                danger
              >
                Block
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleStatusChange(record);
                }}
              >
                Approve
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const handleStatusChange = async (data) => {

    try {
      let updatedPayload = {
        ...data,
        theatreId: data._id,
        isActive: !data.isActive,
      };
      const response = await updateTheatre(updatedPayload);
      getData();
      console.log(response)
      if (response.success) {
        message.success(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <h2>TheatreList</h2>
      <Table dataSource={theatres} columns={tableHeadings} />
    </div>
  );
};

export default TheatreList;

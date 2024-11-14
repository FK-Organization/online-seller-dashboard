import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input, DatePicker } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

const Listings = () => {
  const navigate = useNavigate();
  
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Listing One",
      description: "This is the first listing.",
      price: "$100",
      image: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg",
      date: "2024-01-01"
    },
    {
      id: 2,
      title: "Listing Two",
      description: "This is the second listing.",
      price: "$200",
      image: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg",
      date: "2024-02-01"
    },
    {
      id: 3,
      title: "Listing Three",
      description: "This is the third listing.",
      price: "$300",
      image: "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg",
      date: "2024-03-01"
    }
  ]);

  const [searchText, setSearchText] = useState("");
  const [price, setPrice] = useState("");
  const [selectedDates, setSelectedDates] = useState(null);

  const handleView = (record) => {
    navigate(`/listings/view/${record.id}`);
  };

  const handleUpdate = (record) => {
    navigate(`/listings/update/${record.id}`);
  };

  const handleDelete = (record) => {
    setListings((prevListings) => prevListings.filter((item) => item.id !== record.id));
    message.success(`Deleted ${record.title}`);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => <img src={url} alt="Listing" style={{ width: 60, height: 60, borderRadius: 4 }} />
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("YYYY-MM-DD")
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="link" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this listing?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const filteredListings = listings
    .filter((listing) =>
      listing.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((listing) =>
      price ? parseInt(listing.price.replace("$", "")) <= parseInt(price) : true
    )
    .filter((listing) =>
      selectedDates && selectedDates.length === 2
        ? moment(listing.date).isBetween(selectedDates[0], selectedDates[1], null, "[]")
        : true
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Listings</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          placeholder="Enter max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <RangePicker
          onChange={(dates) => setSelectedDates(dates)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredListings}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
      />
    </div>
  );
};

export default Listings;

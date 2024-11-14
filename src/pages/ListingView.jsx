import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Divider, Space, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ListingView = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedListing = {
      id,
      title: "Sample Listing",
      description: "This is a sample description.",
      price: "$100",
      date: "2024-01-01",
      imageUrl:
        "https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-1035x780.jpg",
    };
    setListing(fetchedListing);
  }, [id]);

  const handleUpdate = (record) => {
    navigate(`/listings/update/${record.id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card
        title={
          <Title level={4} className="mb-0">
            Listing Details
          </Title>
        }
        extra={
          <Button
            onClick={() => handleUpdate(listing)}
            type="primary"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
        }
        className="shadow-lg rounded-lg max-w-4xl mx-auto"
      >
        <Space direction="vertical" size="large" className="w-full">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <img
                src={listing?.imageUrl}
                alt={listing?.title}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <Text className="font-semibold text-gray-600">Title:</Text>
                <p className="text-lg">{listing?.title}</p>
              </div>
              <div>
                <Text className="font-semibold text-gray-600">Price:</Text>
                <p className="text-lg">{listing?.price}</p>
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <Text className="font-semibold text-gray-600">Description:</Text>
            <p className="text-lg">{listing?.description}</p>
          </div>

          <Divider />

          <div>
            <Text className="font-semibold text-gray-600">Date:</Text>
            <p className="text-lg">{listing?.date}</p>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ListingView;

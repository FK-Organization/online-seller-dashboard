import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Form, Input, Button, Space, message, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Dragger } = Upload;

const ListingUpdate = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showUploader, setShowUploader] = useState(false); // Toggle uploader visibility
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

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
    form.setFieldsValue(fetchedListing);
    setFileList([{ url: fetchedListing.imageUrl, name: "Current Image" }]);
  }, [id, form]);

  const handleSave = (values) => {
    console.log("Received values:", values);
    message.success("Listing updated successfully!");
    navigate(`/listings/${id}`);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card
        title={<Title level={4} className="mb-0">Update Listing</Title>}
        className="shadow-lg rounded-lg max-w-4xl mx-auto"
      >
        {listing && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={listing}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please enter the date" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Current Image">
              <div className="mb-4">
                <img
                  src={listing.imageUrl}
                  alt="Current Listing"
                  className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                />
                <Button type="dashed" icon={<UploadOutlined />} onClick={() => setShowUploader(!showUploader)}>
                  {showUploader ? "Cancel Upload" : "Upload New Image"}
                </Button>
              </div>

              {showUploader && (
                <Dragger
                  name="image"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  className="p-4 bg-gray-100 border-dashed border-gray-300"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag image file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single upload. Click to select a new image or drag an image file here.
                  </p>
                </Dragger>
              )}
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={() => navigate(`/listings/view/${id}`)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ListingUpdate;

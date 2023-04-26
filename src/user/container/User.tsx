import { Col, Row } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IUserProps {}

const User = (props: IUserProps) => {
  const navigate = useNavigate();
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader onBack={() => navigate(-1)} title="사용자 정보">
          사용자 정보
        </PageHeader>
      </Col>
    </Row>
  );
};

export default User;

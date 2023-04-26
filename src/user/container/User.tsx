import { Col, Descriptions, Row, Typography } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchUser } from "../state";
import { useAppDispatch } from "@/store/hooks";

interface IUserProps {}

const User = ({}: IUserProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (name) {
      dispatch(fetchUser(name));
    }
  }, [name]);

  const isFetched = true;

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader onBack={() => navigate(-1)} title="사용자 정보">
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="소속">
                {user.department}
              </Descriptions.Item>
              <Descriptions.Item label="태그">{user.tag}</Descriptions.Item>
              <Descriptions.Item label="수정 내역">수정 내역</Descriptions.Item>
            </Descriptions>
          )}
          {!user && isFetched && (
            <Typography.Text>존재하지 않는 사용자입니다.</Typography.Text>
          )}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default User;

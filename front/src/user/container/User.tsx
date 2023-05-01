import { Col, Descriptions, Row, Typography, Space } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser, thunkFetchUser } from "../state";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import History from "@/common/component/History";
import TagList from "./TagList";
import Department from "./Department";

interface IUserProps { }

const User = ({ }: IUserProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (name) {
      dispatch(thunkFetchUser(name));
    }
  }, [name]);

  const isFetched = true;

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader onBack={() => navigate(-1)} title={
          <Space>
            사용자 정보
          </Space>
        }>
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="소속">
                <Department />
              </Descriptions.Item>
              <Descriptions.Item label="태그">
                <TagList />
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
                <History />
              </Descriptions.Item>
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

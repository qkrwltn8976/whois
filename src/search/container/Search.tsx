import { useState } from "react";
import { Col, Row, Typography } from "antd";
import { Settings } from "@/search/component/Settings";
import { SearchInput } from "./SearchInput";

export interface ISearchProps {}

export function Search(props: ISearchProps) {
  return (
    <>
      <Row justify="end" style={{ padding: 20 }}>
        <Col>
          <Settings />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 100 }}>
        <Col>
          <Typography.Title>찾 아 야 한 다</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={12}>
          <SearchInput />
        </Col>
      </Row>
    </>
  );
}

import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import * as React from "react";

interface ISearchInputProps {}

export function SearchInput(props: ISearchInputProps) {
  const setKeyword = (value) => {};
  const gotoUser = (value) => {};
  return (
    <AutoComplete
      value={keyword}
      onChange={setKeyword}
      onSelect={gotoUser}
      style={{ width: "100%" }}
      options={[]}
      autoFocus
    >
      <Input
        size="large"
        placeholder="input here"
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
}

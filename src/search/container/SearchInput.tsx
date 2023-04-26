import { AppDispatch, RootState } from "@/store";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "react-router-dom";
import { fetchAutoComplete, searchActions } from "../state";

interface ISearchInputProps {}

const SearchInput = (props: ISearchInputProps) => {
  const keyword = useSelector((state: RootState) => state.search.keyword);
  const dispatch = useDispatch<AppDispatch>();
  const setKeyword = (value: string) => {
    if (value !== keyword) {
      dispatch(searchActions.setValue({ name: "keyword", value }));
      dispatch(fetchAutoComplete(value));
    }
  };
  const autoCompletes = useSelector(
    (state: RootState) => state.search.autoCompletes
  );

  const gotoUser = (value: string) => {};
  return (
    <AutoComplete
      value={keyword}
      onChange={setKeyword}
      onSelect={gotoUser}
      style={{ width: "100%" }}
      options={autoCompletes.map((item) => ({
        value: item.name,
        label: (
          <Space>
            <Typography.Text>{item.name}</Typography.Text>
            <Typography.Text>{item.department}</Typography.Text>
          </Space>
        ),
      }))}
      autoFocus
    >
      <Input
        size="large"
        placeholder="input here"
        prefix={<SearchOutlined />}
      />
    </AutoComplete>
  );
};

export default SearchInput;

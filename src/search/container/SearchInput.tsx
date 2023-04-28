import { AppDispatch, RootState } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/user/state";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  searchActions,
  selectAutoCompletes,
  selectKeyword,
  thunkFetchAutoComplete,
} from "../state";

interface ISearchInputProps {}

const SearchInput = (props: ISearchInputProps) => {
  const keyword = useSelector(selectKeyword);
  const dispatch = useAppDispatch();
  const handleSetKeyword = (value: string) => {
    if (value !== keyword) {
      dispatch(searchActions.setValue({ name: "keyword", value }));
      dispatch(thunkFetchAutoComplete(value));
    }
  };
  const autoCompletes = useSelector(selectAutoCompletes);
  const navigate = useNavigate();
  const goToUser = (value: string) => {
    const user = autoCompletes.find((item) => item.name === value);
    if (user) {
      dispatch(userActions.setValue({ name: "user", value: user }));
      navigate(`/user/${user.name}`);
    }
  };
  return (
    <AutoComplete
      value={keyword}
      onChange={handleSetKeyword}
      onSelect={goToUser}
      style={{ width: "100%" }}
      options={autoCompletes.map((item) => ({
        value: item.name,
        label: (
          <Space>
            <Typography.Text>{item.name}</Typography.Text>
            <Typography.Text>{item.department}</Typography.Text>
            <Typography.Text>{item.tag}</Typography.Text>
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

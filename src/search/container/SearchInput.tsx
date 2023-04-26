import { AppDispatch, RootState } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/user/state";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAutoComplete, searchActions } from "../state";

interface ISearchInputProps {}

const SearchInput = (props: ISearchInputProps) => {
  const keyword = useSelector((state: RootState) => state.search.keyword);
  const dispatch = useAppDispatch();
  const setKeyword = (value: string) => {
    if (value !== keyword) {
      dispatch(searchActions.setValue({ name: "keyword", value }));
      dispatch(fetchAutoComplete(value));
    }
  };
  const autoCompletes = useSelector(
    (state: RootState) => state.search.autoCompletes
  );
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
      onChange={setKeyword}
      onSelect={goToUser}
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

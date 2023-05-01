import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { selectUser, thunkFetchUpdateUser } from "../state";
import { Tag, Input } from "antd";
import { useAppDispatch } from "@/store";
import { PlusOutlined } from "@ant-design/icons";

interface ITagListProps { }

const TagList = (props: ITagListProps) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const tags = user?.tag ? user.tag.split(",").map(item => item.trim()) : [];
  const [isAdd, setIsAdd] = useState(false);
  const [tempTag, setTempTag] = useState("");
  if (!user) return <></>;
  const onAdd = () => {
    setIsAdd(true);
    setTempTag("");
  }
  const onSave = () => {
    if (!tempTag) {
      setIsAdd(false);
    } else if (tags.includes(tempTag)) {
      message.error("이미 같은 태그가 있습니다.")
    } else {
      const newTag = user?.tag ? `${user.tag}, ${tempTag}` : tempTag;

      dispatch(thunkFetchUpdateUser({
        user,
        key: "tag",
        value: newTag,
        type: "tag"
      }));
      setIsAdd(false);
    }
  }
  const onDelete = (tag: string) => {
    const newTag = tags.filter(item => item !== tag).join(", ");
    dispatch(thunkFetchUpdateUser({ user, key: "tag", value: newTag, type: "tag" }));
  }

  return (
    <>
      {tags.map(item => (
        <Tag key={item} closable onClose={() => onDelete(item)}>{item}</Tag>
      ))}
      {!isAdd && (
        <Tag onClick={onAdd}>
          <PlusOutlined />New Tag
        </Tag>
      )}
      {
        isAdd && (
          <Input
            autoFocus
            type="text"
            size="small"
            style={{ width: 100 }}
            value={tempTag}
            onChange={e => setTempTag(e.target.value)}
            onBlur={() => setIsAdd(false)}
            onPressEnter={onSave}
          />
        )
      }
    </>
  );
};

export default TagList;

import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { selectUser, thunkFetchUpdateUser } from "../state";

interface IDepartmentProps { }

const Department = (props: IDepartmentProps) => {
  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const [tempDepartment, setTempDepartment] = useState("");
  const user = useAppSelector(selectUser);
  if (!user) return <></>;
  const dispatch = useAppDispatch();

  const onSaveDepartment = () => {
    if (tempDepartment) {
      dispatch(
        thunkFetchUpdateUser({
          user,
          key: "department",
          value: tempDepartment,
          type: "department",
        })
      );
      setIsEditDepartment(false);
    } else {
      message.error("소속은 필수 값입니다.");
    }
  };
  const onEditDepartment = () => {
    setIsEditDepartment(true);
    setTempDepartment(user.department);
  };

  return (
    <>
      {isEditDepartment && (
        <Input
          autoFocus
          value={tempDepartment}
          onChange={(e) => setTempDepartment(e.target.value)}
          onPressEnter={onSaveDepartment}
          onBlur={() => setIsEditDepartment(false)}
          style={{ width: "100%" }}
        />
      )}
      {!isEditDepartment && (
        <Button
          type="text"
          block
          onClick={onEditDepartment}
          style={{ textAlign: "left", padding: 0 }}
        >
          {user.department}
        </Button>
      )}
    </>
  );
};

export default Department;

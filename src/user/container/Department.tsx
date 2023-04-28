import { RootState, useAppDispatch } from "@/store";
import { Button, Input, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchUpdateUser } from "../state";

interface IDepartmentProps {}

const Department = (props: IDepartmentProps) => {
  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const [tempDepartment, setTempDepartment] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return;
  const dispatch = useAppDispatch();

  const onSaveDepartment = () => {
    if (tempDepartment) {
      dispatch(
        fetchUpdateUser({
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

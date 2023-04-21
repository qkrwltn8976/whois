import { SettingFilled } from "@ant-design/icons";
import { Button, Dropdown, Menu, MenuProps } from "antd";
import * as React from "react";

export interface ISettingsProps {
  logout?: () => void;
}

export function Settings({ logout }: ISettingsProps) {
  const items: MenuProps["items"] = [
    {
      label: "로그아웃",
      key: "0",
      onClick: logout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <Button shape="circle" icon={<SettingFilled />} />
    </Dropdown>
  );
}

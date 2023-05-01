import { Space, Spin } from "antd";

interface IFetchLabelProps {
    label: string,
    actionType: string,
    fetchKey?: string
}

const FetchLabel = ({ label, actionType, fetchKey }: IFetchLabelProps) => {
    return (
        <Space>
            {label}
            {isSlow && <Spin size="small" />}
        </Space>
    )
}

export default FetchLabel;
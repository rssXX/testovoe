import React from 'react';
import {Button, Card, Form, FormProps, Input} from "antd";
import {getInfoShortenUrl} from "../utils/api";

interface FieldType {
    alies: string
}

const GetInfoShortUrl: React.FC = () => {
    const [isPending, setIsPending] = React.useState<boolean>(false)
    const [data, setData] = React.useState({})

    const onFinish: FormProps<FieldType>['onFinish'] = ({alies}) => {
        setIsPending(true)
        getInfoShortenUrl(alies)
            .then((data) => {
                setData(data)
            })
            .finally(() => {
                setIsPending(false)
            })
    };

    return (
        <Card>
            <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Короткая ссылка"
                    name="alies"
                    rules={[
                        {required: true, message: 'Введите URL'},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button danger type="primary" htmlType="submit" disabled={isPending}>
                        Создать
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </Card>
    );
};

export default GetInfoShortUrl;

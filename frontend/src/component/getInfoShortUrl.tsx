import React from 'react';
import {
    Button, Card, Form,
    FormProps, Input, message
} from "antd";
import {getInfoShortenUrl} from "../utils/api";

interface FieldType {
    alias: string
}

const GetInfoShortUrl: React.FC = () => {
    const [isPending, setIsPending] = React.useState<boolean>(false)
    const [data, setData] = React.useState({})

    const onFinish: FormProps<FieldType>['onFinish'] = ({alias}) => {
        setIsPending(true)
        getInfoShortenUrl(alias)
            .then((res) => {
                if ("error" in res) {
                    message.error(res.error);
                    setData({});
                } else {
                    setData(res);
                    message.success(`Информация по alias "${alias}" получена успешно!`);
                }
            })
            .catch((error) => {
                console.error(error);
                message.error("Произошла ошибка при получении информации");
            })
            .finally(() => setIsPending(false));
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
                    name="alias"
                    rules={[
                        {required: true, message: 'Введите URL'},
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isPending}>
                        Проверить
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

import React from 'react';
import {
    Button, Card, Form,
    FormProps, Input, message
} from "antd";
import {deleteShortenUrl} from "../utils/api";

interface FieldType {
    alias: string
}

const DeleteShortUrl: React.FC = () => {
    const [isPending, setIsPending] = React.useState<boolean>(false)

    const onFinish: FormProps<FieldType>['onFinish'] = ({alias}) => {
        setIsPending(true)
        deleteShortenUrl(alias)
            .then((data) => {
                if ("error" in data) {
                    message.error(data.error);
                } else {
                    message.success(`Ссылка с alias "${alias}" успешно удалена`);
                }
            })
            .catch((error) => {
                console.error(error);
                message.error("Произошла ошибка при удалении ссылки");
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
                    <Button danger type="primary" htmlType="submit" disabled={isPending}>
                        Удалить
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default DeleteShortUrl;

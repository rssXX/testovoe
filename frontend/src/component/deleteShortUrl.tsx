import React from 'react';
import {Button, Card, Form, FormProps, Input} from "antd";
import {deleteShortenUrl} from "../utils/api/api.ts";

interface FieldType {
    alies: string
}

const DeleteShortUrl: React.FC = () => {
    const [isPending, setIsPending] = React.useState<boolean>(false)

    const onFinish: FormProps<FieldType>['onFinish'] = ({alies}) => {
        setIsPending(true)
        deleteShortenUrl(alies)
            .then((data) => {
                return data
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
        </Card>
    );
};

export default DeleteShortUrl;

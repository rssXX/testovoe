import React from 'react';
import {
    Card, Button, Col,
    Form, FormProps,
    Input, Row, DatePicker,
    message
} from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { Dayjs } from 'dayjs';
import {ShortenInterface} from "../utils/interface";
import {postShortenUrl} from "../utils/api";


interface FieldType extends Omit<ShortenInterface, 'clickCount' | 'createdAt' | 'alias'>{
    expiresAt?: Dayjs
    alias?: string
}

const CreateShortUrl: React.FC = () => {
    const [isPending, setIsPending] = React.useState<boolean>(false)

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        setIsPending(true);
        postShortenUrl(
            values.originalUrl,
            values.alias,
            values.expiresAt?.unix()
        )
            .then((data) => {
                if ("error" in data) {
                    message.error(data.error);
                } else {
                    // Покажем пользователю, что ссылка создана
                    message.success(
                        `Ссылка успешно создана! Короткая ссылка: ${data.from}`
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                message.error("Произошла ошибка при создании короткой ссылки");
            })
            .finally(() => setIsPending(false));
    };

    return (
        <Card>
            <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={[10, 0]} className={``}>
                    <Col flex={2}>
                        <Form.Item<FieldType>
                            label="Куда"
                            name="originalUrl"
                            rules={[
                                {required: true, message: 'Введите URL'},
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col flex={1}>
                        <Form.Item<FieldType>
                            label="Откуда"
                            name="alias"
                            rules={[
                                {max: 20, message: "Максимум 20 символов"}
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col flex={1}>
                        <Form.Item<FieldType>
                            label="expiresAt"
                            name="expiresAt"
                        >
                            <DatePicker
                                format={{
                                    format: 'YYYY-MM-DD HH:mm:ss',
                                    type: 'mask',
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={isPending}>
                            Создать
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Card>
    );
};

export default CreateShortUrl;

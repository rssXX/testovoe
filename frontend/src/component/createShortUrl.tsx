import React from 'react';
import {
    Card, Button, Col,
    Form, FormProps,
    Input, Row, DatePicker
} from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { Dayjs } from 'dayjs';
import {shortenInterface} from "../utils/interface";
import {postShortenUrl} from "../utils/api/api.ts";


interface FieldType extends Omit<shortenInterface, 'clickCount' | 'createdAt'>{
    expiresAt?: Dayjs
    alies?: string
}

const CreateShortUrl: React.FC = () => {
    const [isPending, setIsPending] = React.useState<boolean>(false)

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setIsPending(true)
        postShortenUrl(values.originalUrl, values.alies, values.expiresAt?.unix())
            .then((data) => {
                console.log(data)
            })
            .finally(() => {
                setIsPending(false)
            })
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
                            name="alies"
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

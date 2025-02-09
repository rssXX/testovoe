import { faker } from '@faker-js/faker';

const generateAlias = () => {
    return faker.string.alphanumeric(20);
}

export default generateAlias
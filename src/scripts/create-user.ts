// 3p
import { createConnection } from 'typeorm';
import { User } from '../app/entities/user.entity';

export const schema = {
  additionalProperties: false,
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    family: { type: 'string' }
  },
  required: ['email'],
  type: 'object',
};

export async function main(args: any) {
  const connection = await createConnection();

  try {
    const user = new User();
    user.email = args.email;
    user.password = args.password;
    user.name = '';
    user.family = '';

    console.log(await user.save())
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}

// 3p
import { createConnection } from 'typeorm';

import { Tag } from '../app/entities/tag.entity'

export const schema = {
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    summary: { type: 'string' }
  },
  required: ['title'],
  type: 'object',
};

export async function main(args) {
  const connection = await createConnection();

  try {
    const tag = new Tag();
    tag.title = args.title;
    tag.summary = args.summary;

    console.log(await tag.save());
  } catch (error) {
    console.error(error.message);
  } finally {
    await connection.close();
  }
}

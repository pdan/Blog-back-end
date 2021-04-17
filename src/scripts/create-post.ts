// 3p
import { createConnection } from 'typeorm';

import { Post } from '../app/entities/post.entity';
import { Tag } from '../app/entities/tag.entity';

export const schema = {
  additionalProperties: false,
  properties: {
    title: { type: 'string' }
  },
  required: [ /* To complete */],
  type: 'object',
};

export async function main(args: { title }) {
  const connection = await createConnection();

  try {
    const post = new Post();
    post.title = args.title;
    post.summary = `This is summary for "${args.title}"`;
    post.content = 'This is post content';
    post.tags = [{ title: 'Technology', summary: 'Any content about today technologies.' } as Tag];
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}

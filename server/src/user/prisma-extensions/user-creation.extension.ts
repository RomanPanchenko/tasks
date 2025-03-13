import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';

export const userCreationExtension = Prisma.defineExtension({
  query: {
    userEntity: {
      async create({ args, query }) {
        args.data = {
          ...args.data,
          ulid: ulid(),
          created_on: new Date(),
          created_by: 1,
          modified_on: new Date(),
          modified_by: 1,
        };
        return query(args);
      },
    },
  },
});


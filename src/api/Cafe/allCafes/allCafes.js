import { prisma } from './../../../../prisma/generated/prisma-client';

export default {
  Query: {
    allCafes: (_, args) => {
        return prisma.cafes();
    }
  }
}


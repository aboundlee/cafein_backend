import { prisma } from './../../../../prisma/generated/prisma-client';

export default {
  Mutation: {
    createCafe: async(_, args) => {

    
    
      const { cafename, address, lat, lng, franchise } = args;

      try {
          return prisma.createCafe({
            cafename,
            address,
            lat,
            lng,
            franchise
          });
        
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
}

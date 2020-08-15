import { prisma } from './../../../../prisma/generated/prisma-client';

export default {
  Mutation: {
    createOpeningHours: async(_, args, request) => {

    
    
        const { cafeId, dayOfTheWeek, open, close } = args;
        
        try {

						const validDayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];

						// dayOfTheWeek 데이터 형태체크 
						if (!validDayOfWeek.includes(dayOfTheWeek)) {
							return false;
						}
				
            const cafe = await prisma.cafe({id: cafeId});
            if (!cafe) {
              return false;
            }
            // Busy 데이터 있는지 체크
            const existingOpeningHours = await prisma.$exists.openingHours({
							AND: [	
								{cafeId: cafe.id},
                {dayOfTheWeek}
								]
            });
 
						console.log(existingOpeningHours);
            if (existingOpeningHours) {
              return false;
            }
            
            const openingHours = await prisma.createOpeningHours({
                cafe: { connect: {id: cafe.id} },
								cafeId: cafe.id,
                dayOfTheWeek,
                open,
                close
            });
                
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
    }
  }
}


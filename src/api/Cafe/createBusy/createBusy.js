import { prisma } from './../../../../prisma/generated/prisma-client';

export default {
  Mutation: {
    createBusy: async(_, args, request) => {
      const { cafeId, dayOfTheWeek, time, busyness } = args;
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
        const existingBusy = await prisma.$exists.busy({
          AND: [
						{cafeId: cafe.id},
            {dayOfTheWeek},
            {time}
          ]
        });
			console.log(dayOfTheWeek);
			console.log(time);

        if (existingBusy) {
          return false;
        }
        
        const busy = await prisma.createBusy({
            cafe: { connect: {id: cafe.id} },
						cafeId: cafe.id,
            dayOfTheWeek,
            time,
            busyness
        });
            
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
}


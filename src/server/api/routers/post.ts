import { z } from "zod";
import bcrypt from 'bcrypt';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.users.findFirst({
        where: {
          email: input.email,
        },
      });
      
      if (existingUser) {
        throw new Error('User email already exists');
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);
      console.log("123r12737",hashedPassword)
      const newUser = await ctx.db.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });
      return newUser;
    }),  

    checkNumber: publicProcedure
    .input(z.object({ email:z.string(),number: z.number() }))
    .mutation(async ({ ctx,input }) => {
      // Check if the number is equal to 12345678
      if (input.number === 12345678) {
          await ctx.db.users.update({
          where: { email:input.email },
          data: { is_email_verified: true }
        });
        return { result: 'success' };
      } else {
        throw new Error('Otp verification failed');
      }
    }),

    login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.users.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(input.password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      return user;
    }),

    fetchInterests: publicProcedure
    .input(
      z.object({
        page: z.number().int().min(1), 
        limit: z.number().int().min(1), 
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit; 
  
      const [interests, totalCount] = await Promise.all([
        ctx.db.interests.findMany({
          take: limit,
          skip: offset,
        }),
        ctx.db.interests.count(),
      ]);
  
      return { interests, totalCount };
    }),
  
    
    updateUserInterests: publicProcedure
    .input(
      z.object({
        userId: z.number(), 
        interestIds: z.array(z.number()), 
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, interestIds } = input;

      const existingUserInterests = await ctx.db.userInterests.findFirst({
        where: {
          user_id: userId,
        },
      });

      if (existingUserInterests) {
        await ctx.db.userInterests.update({
          where: {
            id: existingUserInterests.id,
          },
          data: {
            interest_id: interestIds,
          },
        });
      } else {
        await ctx.db.userInterests.create({
          data: {
            user_id: userId,
            interest_id: interestIds,
          },
        });
      }

      return { message: 'User interests updated successfully' };
    }),

      fetchUserInterests: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const userInterests = await ctx.db.userInterests.findFirst({
        where: {
          user_id: userId,
        },
      });

      return userInterests;
    }),

});

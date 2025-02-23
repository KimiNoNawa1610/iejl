import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient();
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://www.prisma.io/docs/orm/prisma-client

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') global.prismaGlobal = prisma

export default prisma;
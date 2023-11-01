import {PrismaClient} from "@prisma/client"

if(typeof global.prisma === "undefined"){
    global.prisma = new PrismaClient()
}

const Prisma = global.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production") global.prisma =Prisma;

export default Prisma;

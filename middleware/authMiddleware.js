import jwt from "jsonwebtoken";
import { promisify } from "node:util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authentificate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) res.status(401).json({ message: "Invalid token" });

    const token = authHeader.split(" ")[1];
    if (!token || token === "undefined" || token === undefined) throw new Error("User not authentificated");

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
    }
};

export const isAdmin = async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Neleista" });

    const adminRole = await prisma.role.findUnique({ where: { name: "admin" } });
    if (!adminRole) return res.status(500).json({ message: "Admin role nerasta" });

    const userRole = await prisma.userRole.findFirst({
        where: { userId: userId, roleId: adminRole.id },
    });

    if (!userRole) return res.status(403).json({ message: "Prieiga draudziama, reikia admin roles" });

    next();
};

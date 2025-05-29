import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
            },
        });

        const userRole = await prisma.role.findUnique({ where: { name: "user" } });
        if (!userRole) return res.status(500).json({ message: "Vartotojo role nerasta" });

        await prisma.userRole.create({
            data: {
                userId: user.id,
                roleId: userRole.id,
            },
        });

        res.status(201).json({ message: "Registracija sekminga", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: "Vartotojas nerastas" });

        if (user.blocked) return res.status(403).json({ message: "Vartotojas uzblokuotas" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Neteisingas slaptazodis" });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

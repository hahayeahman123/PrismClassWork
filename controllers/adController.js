import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const getAllAds = async (req, res) => {
//     const { categoryId } = req.query;
//     console.log(categoryId);

//     try {
//         let category;
//         if (categoryId) {
//             category = await prisma.category.findUnique({
//                 where: { id: parseInt(categoryId) },
//             });
//         }

//         if (!category) return res.status(404).json({ message: "Kategorija nerasta" });

//         const ads = await prisma.ad.findMany({
//             where: { categoryId: parseInt(categoryId) },
//             include: {
//                 category: true,
//                 user: {
//                     select: {
//                         email: true,
//                     },
//                 },
//             },
//         });
//         res.status(200).json(ads);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };
export const getAllAds = async (req, res) => {
    const { categoryId, search } = req.query;
    console.log("categoryId", categoryId);
    console.log("search", search);

    try {
        const where = {};
        let category;

        if (!categoryId && !search) {
            const ads = await prisma.ad.findMany({
                include: {
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
            });
            res.status(200).json(ads);
        }

        if (categoryId) {
            where.categoryId = parseInt(categoryId);
            category = await prisma.category.findUnique({
                where: { id: parseInt(categoryId) },
            });
        }

        if (search) where.OR = [{ title: { contains: search } }, { content: { contains: search } }];

        const ads = await prisma.ad.findMany({
            where,
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        res.status(200).json(ads);

        if (!category) return res.status(404).json({ message: "Kategorija nerasta" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const createAd = async (req, res) => {
    const { title, content, categoryId } = req.body;

    try {
        const ad = await prisma.ad.create({
            data: {
                title,
                content,
                categoryId: parseInt(categoryId),
                userId: req.user.id,
            },
        });
        res.status(201).json(ad);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

    const ads = await prisma.ad.findMany({ include: { category: true, user: true } });
    res.status(200).json(ads);
};

export const updateAd = async (req, res) => {
    const { id } = req.params;

    try {
        const ad = await prisma.ad.findUnique({ where: { id: parseInt(id) } });
        if (!ad || ad.userId !== req.user.id) {
            return res.status(403).json({ message: "Nerastas skelbimas arba nesate sio skelbimo savininkas" });
        }

        const updated = await prisma.ad.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.status(201).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAd = async (req, res) => {
    const { id } = req.params;

    try {
        const ad = await prisma.ad.findUnique({ where: { id: parseInt(id) } });
        if (!ad || ad.userId !== req.user.id) {
            return res.status(403).json({ message: "Nerastas skelbimas arba nesate sio skelbimo savininkas" });
        }

        await prisma.ad.delete({ where: { id: parseInt(id) } });
        res.status(204).json({ message: "Istrinta" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

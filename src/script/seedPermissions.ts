import { prisma } from "../prismaClient";
import { PERMISSIONS } from "../constants";

const permissions = [
    { name: PERMISSIONS.USERS.READ },
    { name: PERMISSIONS.USERS.EDIT },
    { name: PERMISSIONS.ROLES.READ },
    { name: PERMISSIONS.ROLES.EDIT },
    { name: PERMISSIONS.PRODUCTS.READ },
    { name: PERMISSIONS.PRODUCTS.EDIT },
    { name: PERMISSIONS.ORDERS.READ },
    { name: PERMISSIONS.ORDERS.EDIT },
];

const seedPermissions = async () => {
    await Promise.all(
        permissions.map((permission) =>
            prisma.permission.upsert({
                where: { name: permission.name },
                create: permission,
                update: {},
            }),
        ),
    );

    console.log("Permissions seeded successfully");
};

seedPermissions();

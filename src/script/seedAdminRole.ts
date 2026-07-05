import { prisma } from "../prismaClient";
import { PERMISSIONS } from "../constants";

const adminPermissions = [
    { name: PERMISSIONS.USERS.READ },
    { name: PERMISSIONS.USERS.EDIT },
    { name: PERMISSIONS.ROLES.READ },
    { name: PERMISSIONS.ROLES.EDIT },
    { name: PERMISSIONS.PRODUCTS.READ },
    { name: PERMISSIONS.PRODUCTS.EDIT },
    { name: PERMISSIONS.ORDERS.READ },
    { name: PERMISSIONS.ORDERS.EDIT },
];

const seedAdminRole = async () => {
    await prisma.role.upsert({
        where: { name: "Admin" },
        create: {
            name: "Admin",
            permissions: { connect: adminPermissions },
        },
        update: {
            permissions: { set: adminPermissions },
        },
    });

    console.log("Admin role seeded successfully");
};

seedAdminRole();
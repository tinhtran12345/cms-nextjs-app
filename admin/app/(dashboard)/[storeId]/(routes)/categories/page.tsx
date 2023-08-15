import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/column";
import { format } from "date-fns";
import { CategoriesClient } from "./components/client";

const categoriesPage = async ({
    params,
}: {
    params: {
        storeId: string;
    };
}) => {
    // get all categories
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoriesClient data={formatCategories} />
            </div>
        </div>
    );
};

export default categoriesPage;

"use client";

import { Heading } from "@/components/ui/heading";
import { CategoryColumn, columns } from "./column";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useParams, useRouter } from "next/navigation";

interface CategoriesClientProps {
    data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage categories for your store"
                />
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/categories/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Categories" />
            <Separator />
        </>
    );
};

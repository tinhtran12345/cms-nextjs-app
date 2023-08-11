"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ALertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
    name: z.string().min(2),
});

interface SettingDFormProps {
    initialData: Store;
}

export const SettingForm: React.FC<SettingDFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // console.log(values);
        try {
            setLoading(true);
            // call api
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated");
        } catch (error: any) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const onDelete = async () => {
        try {
            setLoading(true);
            // call api
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted");
        } catch (error: any) {
            toast.error("Make sure removed all products and categories first");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return (
        <>
            {/* Model alert */}
            <ALertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8  max-sm:grid-cols-1">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
            <Separator />
            {/* Api alert */}
        </>
    );
};

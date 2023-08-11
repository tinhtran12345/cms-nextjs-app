"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);
    const route = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/stores", values);
            toast.success("Store created");

            // window.location.assign(`${response.data.id}`);
            window.location.assign(`/`);
            console.log(response);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create a store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-4 py-2 pb-4">
                    <div className="space-y-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    placeholder="E-commerce"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-6 space-x-2 flex items-center justify-end">
                                    <Button
                                        variant={"outline"}
                                        onClick={storeModal.onClose}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button disabled={loading} type="submit">
                                        Continue
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

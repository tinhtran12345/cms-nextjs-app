"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton, auth } from "@clerk/nextjs";
import { useEffect } from "react";
const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!open) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div className="p-4">
            Home page
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default SetupPage;

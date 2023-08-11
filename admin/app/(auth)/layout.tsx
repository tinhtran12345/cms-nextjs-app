export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            {children}
        </div>
    );
}

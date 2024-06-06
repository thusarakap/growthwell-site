export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100 dark:bg-neutral-900">
        {children}
      </div>
    );
  }
  
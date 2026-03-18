import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="mx-auto w-full max-w-7xl px-6 py-10">{children}</div>
    </ProtectedRoute>
  );
}

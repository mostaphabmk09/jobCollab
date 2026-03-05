import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PublishPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">Créer une annonce</h1>
      </div>
    </ProtectedRoute>
  );
}
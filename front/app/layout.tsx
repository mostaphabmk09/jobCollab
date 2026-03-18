import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import "./globals.css";
import MobilePublishButton from "@/components/layout/MobilePublishButton";
import OnboardingGate from "@/components/onboarding/OnboardingGate";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#f2f4ff]">
        <AuthProvider>
          {/* Main Page Wrapper */}
          <div className="flex min-h-[100dvh] flex-col">
            <Navbar />
            <OnboardingGate />
            {/* Content */}
            <main className="flex-1 pb-24 md:pb-0">{children}</main>

            <Footer />

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
            <MobilePublishButton />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

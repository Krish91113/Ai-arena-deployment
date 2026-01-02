import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PlaygroundSection } from "@/components/landing/PlaygroundSection";
import { HistorySection } from "@/components/landing/HistorySection";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import PlaygroundPage from "@/pages/PlaygroundPage";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Hero />
                  <Features />
                  <HowItWorks />
                  <PlaygroundSection />
                  <HistorySection />
                  <FAQ />
                </main>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/playground"
              element={
                <ProtectedRoute>
                  <PlaygroundPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
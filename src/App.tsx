
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import SupportRequests from "./pages/support/SupportRequests";
import NewSupportRequest from "./pages/support/NewSupportRequest";
import SupportRequestDetail from "./pages/support/SupportRequestDetail";
import Forum from "./pages/forum/Forum";
import NewForumTopic from "./pages/forum/NewForumTopic";
import Donation from "./pages/Donation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Layout isAuthenticated={isAuthenticated} onLogout={logout}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support-requests" element={<SupportRequests />} />
        <Route path="/support-requests/new" element={<NewSupportRequest />} />
        <Route path="/support-requests/:id" element={<SupportRequestDetail />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/new" element={<NewForumTopic />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

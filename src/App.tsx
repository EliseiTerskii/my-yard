import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Lectorium from "./pages/Lectorium";
import LectureDetail from "./pages/LectureDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import DocumentGenerator from "./pages/DocumentGenerator";
import LegalBase from "./pages/LegalBase";
import ArticleDetail from "./pages/ArticleDetail";
import Memo from "./pages/Memo";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lectorium" element={<Lectorium />} />
          <Route path="/lectorium/:lectureId" element={<LectureDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/generator" element={<DocumentGenerator />} />
          <Route path="/documents" element={<DocumentGenerator />} />
          <Route path="/legal" element={<LegalBase />} />
          <Route path="/legal/:articleId" element={<ArticleDetail />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

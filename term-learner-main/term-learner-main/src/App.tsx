
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FileSystemProvider } from "./contexts/FileSystemContext";
import { JsonImportPanel } from "./components/JsonImportPanel";
import { JsonGeneratorPanel } from "./components/JsonGeneratorPanel";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showImport, setShowImport] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  useEffect(() => {
    (window as any).showJsonImport = () => {
      setShowImport(true);
      console.log('JSON Import panel opened. Paste your JSON and click Apply.');
    };
    (window as any).showJsonGenerator = () => {
      setShowGenerator(true);
      console.log('JSON Generator panel opened. Build your JSON visually.');
    };
    console.log('%c📦 Hidden commands available:', 'color: #6366f1; font-weight: bold');
    console.log('%c  showJsonImport()   — Import folders & sets from JSON', 'color: #aaa');
    console.log('%c  showJsonGenerator() — Build JSON visually', 'color: #aaa');

    return () => {
      delete (window as any).showJsonImport;
      delete (window as any).showJsonGenerator;
    };
  }, []);

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {showImport && <JsonImportPanel onClose={() => setShowImport(false)} />}
      {showGenerator && <JsonGeneratorPanel onClose={() => setShowGenerator(false)} />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FileSystemProvider>
        <AppContent />
      </FileSystemProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

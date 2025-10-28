import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TextReader } from "@/components/sections/TextReader";
import { VoiceGallery } from "@/components/sections/VoiceGallery";
import { DocumentReader } from "@/components/sections/DocumentReader";
import { About } from "@/components/sections/About";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <Hero />
      
      <Separator className="container" />
      
      <main className="container py-12">
        <Tabs defaultValue="text-reader" className="w-full space-y-8">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 h-auto p-1 bg-card/80 backdrop-blur-xl border border-border shadow-[var(--shadow-md)] rounded-xl">
            <TabsTrigger 
              value="text-reader" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-sm)] rounded-lg py-3 font-medium transition-all"
            >
              Text Reader
            </TabsTrigger>
            <TabsTrigger 
              value="voice-gallery"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-sm)] rounded-lg py-3 font-medium transition-all"
            >
              Voice Gallery
            </TabsTrigger>
            <TabsTrigger 
              value="document-reader"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-sm)] rounded-lg py-3 font-medium transition-all"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="about"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-sm)] rounded-lg py-3 font-medium transition-all"
            >
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text-reader" className="animate-in fade-in duration-500 mt-8">
            <div className="bg-[var(--gradient-section)] rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-lg)]">
              <TextReader />
            </div>
          </TabsContent>

          <TabsContent value="voice-gallery" className="animate-in fade-in duration-500 mt-8">
            <div className="bg-[var(--gradient-section)] rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-lg)]">
              <VoiceGallery />
            </div>
          </TabsContent>

          <TabsContent value="document-reader" className="animate-in fade-in duration-500 mt-8">
            <div className="bg-[var(--gradient-section)] rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-lg)]">
              <DocumentReader />
            </div>
          </TabsContent>

          <TabsContent value="about" className="animate-in fade-in duration-500 mt-8">
            <div className="bg-[var(--gradient-section)] rounded-2xl p-8 border border-border/50 shadow-[var(--shadow-lg)]">
              <About />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

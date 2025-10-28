import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TextReader } from "@/components/sections/TextReader";
import { VoiceGallery } from "@/components/sections/VoiceGallery";
import { DocumentReader } from "@/components/sections/DocumentReader";
import { About } from "@/components/sections/About";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container py-8">
        <Tabs defaultValue="text-reader" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-card/50 backdrop-blur-sm border border-border/50">
            <TabsTrigger value="text-reader">Text Reader</TabsTrigger>
            <TabsTrigger value="voice-gallery">Voice Gallery</TabsTrigger>
            <TabsTrigger value="document-reader">Document Reader</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="text-reader" className="animate-in fade-in duration-500">
            <TextReader />
          </TabsContent>

          <TabsContent value="voice-gallery" className="animate-in fade-in duration-500">
            <VoiceGallery />
          </TabsContent>

          <TabsContent value="document-reader" className="animate-in fade-in duration-500">
            <DocumentReader />
          </TabsContent>

          <TabsContent value="about" className="animate-in fade-in duration-500">
            <About />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Volume2, Square, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const DocumentReader = () => {
  const [documentText, setDocumentText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setDocumentText(text);
      setFileName(file.name);
      toast({
        title: "Document uploaded",
        description: `${file.name} has been loaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not read the document. Please try a text-based file.",
        variant: "destructive",
      });
    }
  };

  const handleSpeak = () => {
    if (!documentText.trim()) {
      toast({
        title: "No document loaded",
        description: "Please upload a document first.",
        variant: "destructive",
      });
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(documentText);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech error",
        description: "Failed to read the document. Please try again.",
        variant: "destructive",
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Document Reader</h2>
        <p className="text-muted-foreground">
          Upload documents and listen to them being read aloud
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 space-y-6 bg-card/95 backdrop-blur-sm border-border/50">
            {!documentText ? (
              <div className="text-center space-y-4 py-12">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Upload Your Document</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports .txt, .doc, .docx, and other text-based formats
                  </p>
                </div>
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                  <label>
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                    <input
                      type="file"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {documentText.length} characters
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <label>
                      Change
                      <input
                        type="file"
                        accept=".txt,.doc,.docx,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </div>

                <div className="max-h-[300px] overflow-y-auto p-4 bg-input/30 rounded-lg border border-border">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {documentText.substring(0, 1000)}
                    {documentText.length > 1000 && "..."}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSpeak}
                    disabled={isSpeaking}
                    className="flex-1 h-12 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    {isSpeaking ? "Reading..." : "Read Document"}
                  </Button>
                  <Button
                    onClick={handleStop}
                    disabled={!isSpeaking}
                    variant="outline"
                    className="h-12 px-6 border-2"
                  >
                    <Square className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 space-y-4 bg-card/95 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-5 h-5" />
              <h3 className="font-semibold">Guidelines & Tips</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Use text-based documents for best results</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Smaller files process faster and more reliably</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Ensure documents are in a readable format</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>You can pause and resume playback anytime</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Works offline - no internet required</span>
              </li>
            </ul>
          </Card>

          <Alert className="bg-primary/5 border-primary/20">
            <Info className="w-4 h-4 text-primary" />
            <AlertDescription className="text-sm text-foreground">
              Supported formats: TXT, DOC, DOCX, PDF (text-based)
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

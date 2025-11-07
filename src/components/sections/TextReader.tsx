import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Volume2, Square, Upload, FileText, Image as ImageIcon, Save, Download, Sparkles, FileSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const TextReader = () => {
  const [text, setText] = useState("Welcome to VoiceLens. Type or paste your text here, or upload a file to convert it into speech.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [pitch, setPitch] = useState([1]);
  const [rate, setRate] = useState([1]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setText(text);
      toast({
        title: "File uploaded",
        description: "Your file content has been loaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not read the file. Please try a text file.",
        variant: "destructive",
      });
    }
  };

  const handleSpeak = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to speak",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.pitch = pitch[0];
    utterance.rate = rate[0];

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = async () => {
      setIsSpeaking(false);
      
      // Track reading history
      if (user) {
        await supabase.from('reading_history').insert({
          user_id: user.id,
          content_type: 'text',
          title: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
          voice_used: voice?.name || 'Default',
          language: voice?.lang || 'en-US',
        });
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech error",
        description: "Failed to synthesize speech. Please try again.",
        variant: "destructive",
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSaveAudio = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save audio files.",
        variant: "destructive",
      });
      return;
    }

    if (!saveTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your audio.",
        variant: "destructive",
      });
      return;
    }

    const voice = voices.find((v) => v.name === selectedVoice);
    
    const { error } = await supabase.from('saved_audio').insert({
      user_id: user.id,
      title: saveTitle,
      text_content: text,
      voice_name: voice?.name || 'Default',
      language: voice?.lang || 'en-US',
    });

    if (error) {
      toast({
        title: "Save failed",
        description: "Could not save audio. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved successfully",
        description: "Your audio has been saved to your library.",
      });
      setSaveDialogOpen(false);
      setSaveTitle("");
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleAIProcess = async (action: 'enhance' | 'summarize') => {
    if (!text.trim()) {
      toast({
        title: "No text to process",
        description: "Please enter some text first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-text-processor', {
        body: { text, action }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setText(data.result);
      toast({
        title: action === 'enhance' ? "Text Enhanced" : "Text Summarized",
        description: `AI has ${action === 'enhance' ? 'improved' : 'summarized'} your text for better speech output.`,
      });
    } catch (error) {
      console.error('AI processing error:', error);
      toast({
        title: "AI Processing Failed",
        description: error instanceof Error ? error.message : "Could not process text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Text Reader</h2>
        <p className="text-muted-foreground">
          Type, paste, or upload text to convert it into natural speech
        </p>
      </div>

      <Card className="p-6 space-y-6 bg-card/95 backdrop-blur-sm border-border/50">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="text-input" className="text-sm font-medium text-foreground">
              Your Text
            </label>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAIProcess('enhance')}
                disabled={isProcessing || !text.trim()}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                {isProcessing ? "Processing..." : "Enhance"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAIProcess('summarize')}
                disabled={isProcessing || !text.trim()}
              >
                <FileSearch className="w-4 h-4 mr-1" />
                Summarize
              </Button>
              <Button variant="outline" size="sm" className="relative" asChild>
                <label>
                  <FileText className="w-4 h-4 mr-1" />
                  Upload File
                  <input
                    type="file"
                    accept=".txt,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          </div>
          <Textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="min-h-[200px] resize-none text-base leading-relaxed bg-input/50 border-border focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Voice & Language</label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="bg-input/50 border-border">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border max-h-[300px]">
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Pitch: {pitch[0].toFixed(1)}
            </label>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              min={0.5}
              max={2}
              step={0.1}
              className="mt-4"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Speed: {rate[0].toFixed(1)}x
            </label>
            <Slider
              value={rate}
              onValueChange={setRate}
              min={0.5}
              max={2}
              step={0.1}
              className="mt-4"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="flex-1 h-12 text-base font-medium bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          >
            <Volume2 className="w-5 h-5 mr-2" />
            {isSpeaking ? "Speaking..." : "Speak"}
          </Button>
          <Button
            onClick={handleStop}
            disabled={!isSpeaking}
            variant="outline"
            className="h-12 px-6 border-2"
          >
            <Square className="w-5 h-5" />
          </Button>
          
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-12 px-6 border-2"
                disabled={!text.trim()}
              >
                <Save className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Audio</DialogTitle>
                <DialogDescription>
                  Give your audio a title to save it to your library.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="My audio recording"
                    value={saveTitle}
                    onChange={(e) => setSaveTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveAudio}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

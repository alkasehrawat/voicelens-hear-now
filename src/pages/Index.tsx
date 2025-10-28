import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Volume2, Square, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [text, setText] = useState("Welcome to VoiceLens. Type or paste your text here, and I'll read it aloud for you.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [pitch, setPitch] = useState([1]);
  const [rate, setRate] = useState([1]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

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

  const handleSpeak = () => {
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
    utterance.onend = () => setIsSpeaking(false);
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

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8 animate-in fade-in duration-700">
        {/* Header */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="relative">
              <Mic className="w-10 h-10 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            VoiceLens
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            Type. Listen. Feel.
          </p>
        </header>

        {/* Main Card */}
        <Card className="p-6 md:p-8 space-y-6 shadow-lg border-border/50 backdrop-blur-sm bg-card/95">
          {/* Text Area */}
          <div className="space-y-2">
            <label htmlFor="text-input" className="text-sm font-medium text-foreground">
              Your Text
            </label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[200px] resize-none text-base leading-relaxed bg-input/50 border-border focus:border-primary transition-colors"
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Voice Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Voice</label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="bg-input/50 border-border">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border max-h-[300px]">
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pitch Control */}
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

            {/* Rate Control */}
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="flex-1 h-12 text-base font-medium bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-md"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              {isSpeaking ? "Speaking..." : "Speak"}
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isSpeaking}
              variant="outline"
              className="h-12 px-6 border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors"
            >
              <Square className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground">
          Powered by Web Speech API • Works entirely in your browser
        </footer>
      </div>
    </div>
  );
};

export default Index;

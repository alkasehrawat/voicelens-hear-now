import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

const sampleText = "Hello! This is a sample voice for VoiceLens. Experience natural and clear speech synthesis.";

export const VoiceGallery = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      // Group voices by language and select representative ones
      const uniqueLanguages = new Map<string, SpeechSynthesisVoice>();
      availableVoices.forEach(voice => {
        const langCode = voice.lang.split('-')[0];
        if (!uniqueLanguages.has(langCode)) {
          uniqueLanguages.set(langCode, voice);
        }
      });
      setVoices(Array.from(uniqueLanguages.values()).slice(0, 12));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlaySample = (voice: SpeechSynthesisVoice) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(sampleText);
    utterance.voice = voice;
    utterance.onstart = () => setPlayingVoice(voice.name);
    utterance.onend = () => setPlayingVoice(null);
    utterance.onerror = () => setPlayingVoice(null);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlayingVoice(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Voice Gallery</h2>
        <p className="text-muted-foreground">
          Explore voice samples across different languages and accents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {voices.map((voice) => (
          <Card key={voice.name} className="p-6 space-y-4 bg-card/95 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{voice.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {voice.lang}
                </span>
                {voice.localService && (
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground">
                    Local
                  </span>
                )}
              </div>
            </div>
            
            <Button
              onClick={() => playingVoice === voice.name ? handleStop() : handlePlaySample(voice)}
              className={`w-full ${playingVoice === voice.name ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
            >
              {playingVoice === voice.name ? (
                <>
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play Sample
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

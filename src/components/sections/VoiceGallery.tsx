import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

const sampleText = "Hello! This is a sample voice for VoiceLens. Experience natural and clear speech synthesis.";

export const VoiceGallery = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const getLanguageName = (langCode: string): string => {
    const languageNames: Record<string, string> = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'bn': 'Bengali',
      'pa': 'Punjabi',
      'te': 'Telugu',
      'mr': 'Marathi',
      'ta': 'Tamil',
      'ur': 'Urdu',
      'gu': 'Gujarati',
      'kn': 'Kannada',
      'ml': 'Malayalam',
      'th': 'Thai',
      'vi': 'Vietnamese',
      'id': 'Indonesian',
      'tr': 'Turkish',
      'pl': 'Polish',
      'uk': 'Ukrainian',
      'ro': 'Romanian',
      'nl': 'Dutch',
      'el': 'Greek',
      'cs': 'Czech',
      'sv': 'Swedish',
      'hu': 'Hungarian',
      'fi': 'Finnish',
      'da': 'Danish',
      'no': 'Norwegian',
      'sk': 'Slovak',
      'he': 'Hebrew',
      'af': 'Afrikaans',
    };
    const code = langCode.split('-')[0];
    return languageNames[code] || langCode;
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Get all unique language voices
      const languageVoicesMap = new Map<string, SpeechSynthesisVoice>();
      
      availableVoices.forEach(voice => {
        const langCode = voice.lang.split('-')[0];
        // Prefer local voices and only add if not already in map
        if (!languageVoicesMap.has(langCode) || (voice.localService && !languageVoicesMap.get(langCode)?.localService)) {
          languageVoicesMap.set(langCode, voice);
        }
      });
      
      setVoices(Array.from(languageVoicesMap.values()));
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
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
          Voice Gallery
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore natural voice samples across {voices.length}+ languages and accents. 
          Each voice is optimized for clarity and expression.
        </p>
      </div>

      {voices.length === 0 ? (
        <Card className="p-12 text-center bg-card/95 backdrop-blur-sm">
          <p className="text-muted-foreground">Loading voices...</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {voices.map((voice) => {
            const languageName = getLanguageName(voice.lang);
            const isPlaying = playingVoice === voice.name;
            
            return (
              <Card 
                key={voice.name} 
                className={`group p-5 space-y-4 bg-[var(--gradient-card)] backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-[var(--shadow-md)] transition-all ${
                  isPlaying ? 'ring-2 ring-primary shadow-[var(--shadow-glow)]' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2 flex-1">
                      {languageName}
                    </h3>
                    {voice.localService && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium whitespace-nowrap">
                        Local
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                      {voice.lang}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {voice.name.length > 20 ? voice.name.substring(0, 20) + '...' : voice.name}
                    </span>
                  </div>
                </div>
                
                <Button
                  onClick={() => isPlaying ? handleStop() : handlePlaySample(voice)}
                  variant={isPlaying ? "destructive" : "default"}
                  className={`w-full transition-all ${
                    isPlaying 
                      ? 'bg-destructive hover:bg-destructive/90' 
                      : 'bg-gradient-to-r from-primary to-accent hover:opacity-90'
                  }`}
                  size="sm"
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-3.5 h-3.5 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 mr-2" />
                      Play Sample
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

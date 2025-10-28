import { Mic, Sparkles, Globe, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      
      {/* Animated Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-[var(--shadow-glow)] transform hover:scale-110 transition-transform">
                <Mic className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                VoiceLens
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium">
              Type. Listen. Feel.
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your text into natural, expressive speech with VoiceLens. 
            A powerful, privacy-first text-to-speech platform that brings your words to life 
            across multiple languages and voices.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-sm">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">50+ Languages</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-sm">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">Instant Processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

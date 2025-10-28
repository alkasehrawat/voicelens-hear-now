import { Github, Twitter, Mail, Heart, Shield, Zap, Globe, Accessibility } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-[var(--gradient-card)] mt-20 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-section)] pointer-events-none" />
      
      <div className="container relative py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              VoiceLens
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Transform text into natural speech with advanced AI-powered voice synthesis. 
              Built for accessibility, powered by privacy-first technology.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Features</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  Text to Speech
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  Document Reader
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  Voice Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  Multi-language
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  Guidelines
                </a>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-success rounded-full" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-success rounded-full" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-success rounded-full" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-success rounded-full" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Core Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">Privacy First</p>
              <p className="text-xs text-muted-foreground">100% Local</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
            <Zap className="w-5 h-5 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">Lightning Fast</p>
              <p className="text-xs text-muted-foreground">Instant Speech</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
            <Globe className="w-5 h-5 text-success flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">Global Reach</p>
              <p className="text-xs text-muted-foreground">50+ Languages</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
            <Accessibility className="w-5 h-5 text-primary-glow flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">Accessible</p>
              <p className="text-xs text-muted-foreground">For Everyone</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-muted-foreground">
            © 2025 VoiceLens. Powered by Web Speech API. All rights reserved.
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> for accessibility
          </p>
        </div>
      </div>
    </footer>
  );
};

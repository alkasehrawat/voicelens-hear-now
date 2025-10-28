import { Card } from "@/components/ui/card";
import { Volume2, Globe, Zap, Shield, Users, Code } from "lucide-react";

const features = [
  {
    icon: Volume2,
    title: "Text-to-Speech",
    description: "Convert any text into natural-sounding speech with advanced synthesis technology",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Access voices in dozens of languages and regional accents",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Real-time speech synthesis with no delays or waiting",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens in your browser - no data sent to servers",
  },
  {
    icon: Users,
    title: "Accessible",
    description: "Helps users with visual impairments or reading difficulties",
  },
  {
    icon: Code,
    title: "Web Speech API",
    description: "Built on modern web standards for reliability and performance",
  },
];

const techStack = [
  { name: "React", color: "bg-blue-500/10 text-blue-500" },
  { name: "TypeScript", color: "bg-blue-600/10 text-blue-600" },
  { name: "Tailwind CSS", color: "bg-cyan-500/10 text-cyan-500" },
  { name: "Web Speech API", color: "bg-purple-500/10 text-purple-500" },
  { name: "Vite", color: "bg-yellow-500/10 text-yellow-500" },
];

export const About = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">About VoiceLens</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          VoiceLens is a powerful, privacy-focused text-to-speech platform that brings your words to life
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 space-y-4 bg-card/95 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Social Impact</h3>
          <p className="text-muted-foreground">Making information accessible to everyone</p>
        </div>
        
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Browser-based processing</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Languages & voices</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">Zero</p>
              <p className="text-sm text-muted-foreground">Cost for users</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Built With Modern Technology</h3>
          <p className="text-muted-foreground">Powered by cutting-edge web technologies</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full font-medium text-sm ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

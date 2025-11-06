import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Download, Trash2, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedAudio {
  id: string;
  title: string;
  text_content: string;
  voice_name: string | null;
  language: string | null;
  created_at: string;
}

interface ReadingHistory {
  id: string;
  content_type: string;
  title: string | null;
  voice_used: string | null;
  language: string | null;
  read_at: string;
}

const Library = () => {
  const [savedAudio, setSavedAudio] = useState<SavedAudio[]>([]);
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [audioRes, historyRes] = await Promise.all([
        supabase.from('saved_audio').select('*').order('created_at', { ascending: false }),
        supabase.from('reading_history').select('*').order('read_at', { ascending: false }).limit(50)
      ]);

      if (audioRes.data) setSavedAudio(audioRes.data);
      if (historyRes.data) setHistory(historyRes.data);
    } catch (error) {
      console.error('Error fetching library data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAudio = async (id: string) => {
    const { error } = await supabase.from('saved_audio').delete().eq('id', id);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete audio',
      });
    } else {
      setSavedAudio(savedAudio.filter(a => a.id !== id));
      toast({
        title: 'Deleted',
        description: 'Audio file deleted successfully',
      });
    }
  };

  const clearHistory = async () => {
    const { error } = await supabase.from('reading_history').delete().eq('user_id', user?.id);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to clear history',
      });
    } else {
      setHistory([]);
      toast({
        title: 'Cleared',
        description: 'Reading history cleared successfully',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <div className="container py-12 text-center">
          <div className="animate-pulse">Loading your library...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Your Library
          </h1>
          <p className="text-muted-foreground">
            Access your saved audio files and reading history
          </p>
        </div>

        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="saved">Saved Audio ({savedAudio.length})</TabsTrigger>
            <TabsTrigger value="history">History ({history.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="mt-6">
            {savedAudio.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No saved audio files yet. Start creating and saving your audio!
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedAudio.map((audio) => (
                  <Card key={audio.id} className="hover:shadow-[var(--shadow-lg)] transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{audio.title}</CardTitle>
                      <CardDescription>
                        {audio.voice_name} • {audio.language}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {audio.text_content}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteAudio(audio.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="mb-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearHistory}
                disabled={history.length === 0}
              >
                Clear History
              </Button>
            </div>

            {history.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No reading history yet. Start using VoiceLens to see your activity here!
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {history.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.title || 'Untitled'}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.content_type} • {item.voice_used} • {item.language}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.read_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Library;

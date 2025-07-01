'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getOnboardingSummary, regenerateOnboardingSummary } from './actions';
import useProject from '@/hooks/use-project';
import { Loader2, RefreshCw, Book, Code2, Boxes, Wrench, TestTube2, Rocket, GitPullRequest, Menu } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

const MDPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

const GuideSection = ({ title, icon: Icon, content }: { title: string; icon: any; content: string }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 border-b pb-2">
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div data-color-mode="dark">
      <MDPreview
        source={content}
        style={{
          backgroundColor: 'transparent',
          color: 'inherit',
          fontSize: '0.875rem'
        }}
      />
    </div>
  </div>
);

const DependencyCard = ({ dep }: { dep: { name: string; purpose: string } }) => (
  <div className="rounded-lg border bg-card p-3 hover:bg-accent/50 transition-colors">
    <h4 className="font-medium text-sm">{dep.name}</h4>
    <p className="text-sm text-muted-foreground mt-1">{dep.purpose}</p>
  </div>
);

const OnboardingPage = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { projectId } = useProject();
  const [activeTab, setActiveTab] = useState('overview');

  const fetchOnboardingSummary = async (regenerate = false) => {
    if (!projectId) return;

    setLoading(true);
    setError(null);
    try {
      const result = regenerate
        ? await regenerateOnboardingSummary(projectId)
        : await getOnboardingSummary(projectId);

      if (!result.success) {
        throw new Error(result.error);
      }

      setSummary(result.data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate onboarding summary.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnboardingSummary();
  }, [projectId]);

  if (!projectId) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-muted-foreground">
        Please select a project to view its onboarding summary.
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'architecture', label: 'Architecture', icon: Boxes },
    { id: 'setup', label: 'Setup', icon: Wrench },
    { id: 'code', label: 'Code', icon: Code2 },
    { id: 'testing', label: 'Testing', icon: TestTube2 },
    { id: 'deployment', label: 'Deployment', icon: Rocket },
    { id: 'contributing', label: 'Contributing', icon: GitPullRequest },
  ];

  const MobileNav = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {sections.map((section) => (
          <DropdownMenuItem
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className="flex items-center"
          >
            <section.icon className="mr-2 h-4 w-4" />
            {section.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container py-6 lg:py-10 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Project Guide</h1>
        <div className="flex items-center gap-2">
          <MobileNav />
          <Button
            variant="outline"
            onClick={() => fetchOnboardingSummary(true)}
            disabled={loading}
            size="sm"
            className="hidden sm:flex"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchOnboardingSummary(true)}
            disabled={loading}
            size="icon"
            className="sm:hidden"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Generating comprehensive guide...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-destructive">{error}</div>
          </CardContent>
        </Card>
      ) : summary && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-9 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <CardHeader className="space-y-0 pb-2 lg:pb-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0 overflow-x-auto">
                  <CardTitle className="text-lg">Documentation</CardTitle>
                  <div className="w-full lg:w-auto overflow-x-auto">
                    <TabsList className="inline-flex h-9 lg:h-10 w-auto min-w-full lg:min-w-0">
                      {sections.map((section) => (
                        <TabsTrigger
                          key={section.id}
                          value={section.id}
                          className="flex items-center gap-2 px-2.5 lg:px-4"
                        >
                          <section.icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{section.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[600px] pr-4">
                  <TabsContent value="overview" className="mt-0 space-y-6">
                    <GuideSection title="About the Project" icon={Book} content={summary.about} />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Boxes className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Project Structure</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {summary.keyFolders?.map((folder: string) => (
                          <div key={folder} className="flex items-start gap-2 p-3 rounded-lg border bg-card">
                            <Code2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span className="text-sm">{folder}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="architecture" className="mt-0">
                    <GuideSection title="System Architecture" icon={Boxes} content={summary.architecture} />
                  </TabsContent>
                  <TabsContent value="setup" className="mt-0 space-y-6">
                    <GuideSection title="Setup Instructions" icon={Wrench} content={summary.setup} />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Code2 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Key Dependencies</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {summary.dependencies?.map((dep: any) => (
                          <DependencyCard key={dep.name} dep={dep} />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="mt-0">
                    <GuideSection title="Code Style Guide" icon={Code2} content={summary.codeStyle} />
                  </TabsContent>
                  <TabsContent value="testing" className="mt-0">
                    <GuideSection title="Testing Guidelines" icon={TestTube2} content={summary.testing} />
                  </TabsContent>
                  <TabsContent value="deployment" className="mt-0">
                    <GuideSection title="Deployment Process" icon={Rocket} content={summary.deployment} />
                  </TabsContent>
                  <TabsContent value="contributing" className="mt-0 space-y-6">
                    <GuideSection title="How to Contribute" icon={GitPullRequest} content={summary.contributing} />
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <GitPullRequest className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Recent Activity</h3>
                      </div>
                      <div className="space-y-3">
                        {summary.firstIssues?.map((issue: any) => (
                          <div key={issue.hash} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                            <div className="flex-1">
                              <p className="text-sm">{issue.message}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  {issue.hash}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  by {issue.author}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </CardContent>
            </Tabs>
          </Card>

          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeTab === section.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(section.id)}
                    >
                      <section.icon className="mr-2 h-4 w-4" />
                      {section.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage; 
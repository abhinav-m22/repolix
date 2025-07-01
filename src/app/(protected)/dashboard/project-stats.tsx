'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import useProject from '@/hooks/use-project';
import { api } from '@/trpc/react';
import { Activity, GitCommit, GitPullRequest, Users } from 'lucide-react';

const StatItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="flex items-center gap-2">
    <div className="p-2 rounded-md bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ message, author, time }: { message: string; author: string; time: string }) => (
  <div className="flex items-start gap-2 py-2">
    <Activity className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
    <div className="space-y-1">
      <p className="text-sm">{message}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{author}</span>
        <span>•</span>
        <span>{time}</span>
      </div>
    </div>
  </div>
);

const ProjectStats = () => {
  const { project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery(
    { projectId: project?.id || '' },
    { enabled: !!project?.id }
  );

  const recentActivity = commits?.slice(0, 4).map(commit => ({
    message: commit.message,
    author: commit.authorName,
    time: new Date(commit.date).toLocaleDateString()
  })) || [];

  const stats = [
    {
      icon: GitCommit,
      label: 'Total Commits',
      value: commits?.length || 0
    },
    {
      icon: Users,
      label: 'Contributors',
      value: Array.from(new Set(commits?.map(c => c.authorName) || [])).length
    },
    {
      icon: GitPullRequest,
      label: 'Open PRs',
      value: '~' // This would need to be fetched from GitHub API if needed
    }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-medium">Project Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <StatItem key={i} {...stat} />
            ))}
          </div>

          {/* <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Activity</h4>
            <ScrollArea className="h-[180px]">
              <div className="space-y-0 divide-y">
                {recentActivity.map((activity, i) => (
                  <ActivityItem key={i} {...activity} />
                ))}
              </div>
            </ScrollArea>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStats; 
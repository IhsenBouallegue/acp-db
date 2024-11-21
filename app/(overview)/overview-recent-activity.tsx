"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity() {
  // This will be replaced with a server component or React Query for fetching recent activity
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "added a new article",
      target: "Setup Guide for Metalstrip X",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "commented on",
      target: "Troubleshooting Guide for Tool Y",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "shared an idea",
      target: "Improving Metalstrip Z efficiency",
      timestamp: "1 day ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-2">
              <span className="text-muted-foreground text-sm">{activity.timestamp}</span>
              <div>
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

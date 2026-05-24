"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Filters {
  dateRange: { from: string | null; to: string | null } | null;
  platform: string[];
}

interface DashboardFiltersProps {
  filters: Filters;
  setDateRange: (range: { from: string | null; to: string | null } | null) => void;
  togglePlatform: (platform: string) => void;
  resetFilters: () => void;
}

const PLATFORMS = [
  { value: "doordash", label: "DoorDash" },
  { value: "uber-eats", label: "Uber Eats" },
  { value: "in-store", label: "In Store" },
];

export function DashboardFilters({ filters, setDateRange, togglePlatform, resetFilters }: DashboardFiltersProps) {
  const hasActiveFilters = filters.dateRange !== null || filters.platform.length > 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                From
              </label>
              <input
                type="date"
                value={filters.dateRange?.from || ""}
                onChange={(e) =>
                  setDateRange({
                    from: e.target.value || null,
                    to: filters.dateRange?.to || null,
                  })
                }
                className="flex h-9 w-40 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                To
              </label>
              <input
                type="date"
                value={filters.dateRange?.to || ""}
                onChange={(e) =>
                  setDateRange({
                    from: filters.dateRange?.from || null,
                    to: e.target.value || null,
                  })
                }
                className="flex h-9 w-40 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">
              Platform
            </label>
            <div className="flex items-center gap-3 h-9">
              {PLATFORMS.map((p) => (
                <label key={p.value} className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.platform.includes(p.value)}
                    onChange={() => togglePlatform(p.value)}
                    className="accent-primary h-4 w-4 rounded border-input"
                  />
                  {p.label}
                </label>
              ))}
              {filters.platform.length === 0 && (
                <span className="text-xs text-muted-foreground">All platforms</span>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="mb-0">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

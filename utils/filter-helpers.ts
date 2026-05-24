export interface DateRange {
  from: string | null;
  to: string | null;
}

export type PlatformFilter = string[];

export interface DashboardFilters {
  dateRange: DateRange | null;
  platform: PlatformFilter;
}

export function isDateInRange(
  dateStr: string | null | undefined,
  range: DateRange | null
): boolean {
  if (!range || (!range.from && !range.to)) return true;
  if (!dateStr) return false;
  const d = dateStr.substring(0, 10);
  if (range.from && d < range.from) return false;
  if (range.to && d > range.to) return false;
  return true;
}

function matchesSinglePlatform(
  eatsBrand: string | null | undefined,
  orderChannel: string | null | undefined,
  platform: string
): boolean {
  const brand = (eatsBrand || "").toLowerCase();
  const channel = (orderChannel || "").toLowerCase();
  if (platform === "doordash") {
    return brand.includes("doordash") || channel.includes("doordash");
  }
  if (platform === "uber-eats") {
    return brand.includes("uber") || channel.includes("uber");
  }
  if (platform === "in-store") {
    return !brand.includes("doordash") && !channel.includes("doordash") &&
           !brand.includes("uber") && !channel.includes("uber");
  }
  return false;
}

export function matchesPlatform(
  eatsBrand: string | null | undefined,
  orderChannel: string | null | undefined,
  platforms: PlatformFilter
): boolean {
  if (platforms.length === 0) return true;
  return platforms.some((p) => matchesSinglePlatform(eatsBrand, orderChannel, p));
}

function matchesDiningSingle(
  diningOption: string | null | undefined,
  platform: string
): boolean {
  const opt = (diningOption || "").toLowerCase();
  if (platform === "doordash") {
    return opt.includes("doordash") || opt.includes("dd ");
  }
  if (platform === "uber-eats") {
    return opt.includes("uber") || opt.includes("ue ");
  }
  if (platform === "in-store") {
    return !opt.includes("doordash") && !opt.includes("dd ") &&
           !opt.includes("uber") && !opt.includes("ue ");
  }
  return false;
}

export function matchesDiningOption(
  diningOption: string | null | undefined,
  platforms: PlatformFilter
): boolean {
  if (platforms.length === 0) return true;
  return platforms.some((p) => matchesDiningSingle(diningOption, p));
}

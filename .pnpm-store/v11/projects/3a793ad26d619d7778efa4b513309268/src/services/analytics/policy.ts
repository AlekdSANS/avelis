export function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function canEmitAnalytics({
  analyticsEnabled,
  consentGranted,
  pathname,
}: {
  analyticsEnabled: boolean;
  consentGranted: boolean;
  pathname: string;
}): boolean {
  return (
    analyticsEnabled &&
    consentGranted &&
    !isAdminRoute(pathname)
  );
}

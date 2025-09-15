"use client";

import { createContext, useContext } from "react";
import type { TenantConfig } from "@/lib/types";

const TenantContext = createContext<TenantConfig | null>(null);

export function TenantProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: TenantConfig | null;
}) {
  return (
    <TenantContext.Provider value={config}>{children}</TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  return context;
}

export default TenantContext;

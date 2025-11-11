import { createContext, useContext } from "react";
import type { DepsContainer } from "@/core/state/deps-container";

const DepsContext = createContext<DepsContainer | null>(null);

export const DepsProvider = ({
	deps,
	children,
}: {
	deps: DepsContainer;
	children: React.ReactNode;
}) => <DepsContext.Provider value={deps}>{children}</DepsContext.Provider>;

export const useDeps = () => {
	const ctx = useContext(DepsContext);
	if (!ctx) throw new Error("useDeps must be used within DepsProvider");
	return ctx;
};

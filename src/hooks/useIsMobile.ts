import { useState, useEffect } from "react";

const MOBILE_WIDTH = 760;

export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState<boolean>(() => {
		if (typeof window === "undefined") {
			return false;
		}
		return window.innerWidth < MOBILE_WIDTH;
	});

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_WIDTH);
		};

		window.addEventListener("resize", checkIsMobile);

		return () => {
			window.removeEventListener("resize", checkIsMobile);
		};
	}, []);

	return isMobile;
}

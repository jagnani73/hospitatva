// This can be used as a hook to disable scroll on body as long as the parent component is mounted.
// You can also render it conditionally to toggle scroll according to your needs.

import { useEffect } from "react";

const useDisableScroll = () => {
	useEffect(() => {
		const previousState = document.body.style.overflow ?? "auto";
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousState;
		};
	}, []);

	return null;
};

export default useDisableScroll;

import { PropsWithChildren } from "react";

export function PlaceholderC({ children }: PropsWithChildren<{}>): JSX.Element {
    return <div className="cardPlaceholder">{children}</div>;
}

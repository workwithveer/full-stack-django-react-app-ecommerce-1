import * as React from "react";

// A minimal, neutral stub component for any MUI icon import.
// It preserves JSX usage without loading real icon files.
export default function MuiIconStub(props: React.SVGProps<SVGSVGElement>) {
  return <svg role="img" aria-hidden="true" {...props} />;
}

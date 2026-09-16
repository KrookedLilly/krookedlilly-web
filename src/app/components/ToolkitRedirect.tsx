import { Navigate } from "react-router-dom";

/**
 * Permanent client-side redirect from a retired UI Toolkit detail path
 * (e.g. /tools/screen-manager) to the consolidated suite hub. Keeps old
 * inbound links working instead of falling through to the NotFound route.
 */
export function ToolkitRedirect() {
  return <Navigate to="/tools/ui-toolkit" replace />;
}

export default ToolkitRedirect;

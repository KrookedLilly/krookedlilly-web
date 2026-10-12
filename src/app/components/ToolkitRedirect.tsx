import { PageRedirect } from "./PageRedirect";

/**
 * Permanent redirect from a retired UI Toolkit detail path (e.g.
 * /tools/screen-manager) to the consolidated suite hub.
 */
export function ToolkitRedirect() {
  return <PageRedirect to="/tools/ui-toolkit" title="UI Toolkit Suite" />;
}

export default ToolkitRedirect;

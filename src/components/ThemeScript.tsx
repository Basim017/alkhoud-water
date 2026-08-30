/**
 * Applies the stored theme before first paint.
 *
 * This has to run synchronously in the document head — resolving the theme
 * in React would let the light palette paint first and flash on a dark
 * setting. Reads are wrapped because storage access throws outright in some
 * privacy modes.
 */
const script = `(function(){try{
var s=localStorage.getItem("alkhoud-theme");
var d=s==="dark"||(!s&&window.matchMedia("(prefers-color-scheme: dark)").matches);
document.documentElement.classList.toggle("dark",d);
document.documentElement.style.colorScheme=d?"dark":"light";
}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

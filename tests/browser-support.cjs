const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function destination(pathname, unsupported) {
  let destination;
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync('components/BrowserSupport.tsx', 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.ReactJSX}}).outputText;
  vm.runInNewContext(source, { exports, require(name) {
    if(name==='react') return {useEffect:fn=>fn(),useRef:value=>({current:value})};
    if(name==='next/navigation') return {useRouter:()=>({replace:path=>{destination=path}}), usePathname:()=>pathname};
    if(name==='@/lib/deviceDetection') return {isSafari:()=>unsupported,isMacOS:()=>unsupported};
    throw Error(name);
  }});
  exports.default();
  return destination;
}
test('unsupported interactive browser gets a usable simple portfolio',()=>assert.equal(destination('/',true),'/simple'));
test('supporting pages and simple view remain accessible',()=>{
  for(const path of ['/simple','/simple/','/contact','/pricing','/privacy','/cookies','/process']) assert.equal(destination(path,true),undefined,path);
});
test('supported browsers retain the interactive portfolio',()=>assert.equal(destination('/',false),undefined));

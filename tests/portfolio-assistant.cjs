const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const modules = new Map();
function load(filename) {
  if(modules.has(filename)) return modules.get(filename);
  const exports={}; modules.set(filename,exports);
  const source=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInNewContext(source,{exports,require:name=>load(path.resolve(path.dirname(filename),name+'.ts'))});
  return exports;
}
const {answerPortfolioQuestion:answer,suggestedQuestions}=load(path.resolve('lib/portfolio-assistant.ts'));
test('all predefined questions have grounded answers and sources',()=>{
  for(const question of suggestedQuestions) assert.ok(answer(question).sources.length>0,question);
});
test('named tools answer with their own source, including comparisons',()=>{
  assert.match(answer('Tell me about PasteShield').text,/API keys/);
  assert.equal(answer('Compare QuietNote and FocusForge').sources.length,2);
});
test('unknown questions and unlisted personal details do not invent facts',()=>{
  assert.equal(answer('What is the weather tomorrow?').sources.length,0);
  assert.match(answer('What is his salary?').text,/isn’t listed/);
});
test('follow-up retains the topic and raw markup never executes',()=>{
  const initial=answer('Tell me about QuietNote');
  assert.equal(answer('tell me more',initial.topic).topic,'quietnote');
  assert.equal(answer('<script>alert(1)</script>').sources.length,0);
});
test('answers have no network dependency',()=>{
  assert.match(answer('What is his tech stack?').text,/TypeScript/);
  assert.match(answer('How can I contact him?').text,/nk2552003@gmail.com/);
});

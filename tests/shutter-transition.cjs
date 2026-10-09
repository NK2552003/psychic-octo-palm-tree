const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadModule() {
  const exports = {};
  const source = ts.transpileModule(
    fs.readFileSync('lib/shutter-transition.ts', 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } }
  ).outputText;

  return (context) => {
    vm.runInNewContext(source, { exports, ...context });
    return exports;
  };
}

test('getShutterColor returns exact light mode text color oklch(0.25 0.02 40) and #061614 for dark mode', () => {
  const runner = loadModule();
  const mod = runner({
    document: {
      documentElement: {
        classList: {
          contains: (cls) => cls === 'dark',
        },
      },
    },
  });

  assert.equal(mod.getShutterColor(false), 'oklch(0.25 0.02 40)');
  assert.equal(mod.getShutterColor(true), '#061614');
});

test('triggerThemeTransition creates 5 horizontal shutter strips with light mode text color', () => {
  const runner = loadModule();
  const addedNodes = [];
  const fakeDocument = {
    querySelector: () => null,
    createElement: (tag) => {
      const el = {
        tagName: tag,
        className: '',
        style: {},
        children: [],
        appendChild: (child) => el.children.push(child),
      };
      return el;
    },
    body: {
      appendChild: (node) => addedNodes.push(node),
      contains: () => true,
      removeChild: () => {},
    },
    documentElement: {
      classList: {
        contains: (_cls) => false, // light mode
      },
    },
  };

  const fakeWindow = {};

  const mod = runner({
    document: fakeDocument,
    window: fakeWindow,
    setTimeout: (fn) => fn(),
  });

  let themeChanged = false;
  mod.triggerThemeTransition(() => {
    themeChanged = true;
  });

  assert.equal(themeChanged, true);
  assert.equal(addedNodes.length, 1);
  const container = addedNodes[0];
  assert.equal(container.children.length, 5);
  // Theme change shutter uses exact light mode text color oklch(0.25 0.02 40)
  for (const strip of container.children) {
    assert.equal(strip.style.backgroundColor, 'oklch(0.25 0.02 40)');
    assert.equal(strip.style.width, '100%');
  }
});

test('triggerRouteTransition creates 5 horizontal shutter strips with theme-responsive color', () => {
  const runner = loadModule();
  const addedNodes = [];
  const fakeDocument = {
    querySelector: () => null,
    createElement: (tag) => {
      const el = {
        tagName: tag,
        className: '',
        style: {},
        children: [],
        appendChild: (child) => el.children.push(child),
      };
      return el;
    },
    body: {
      appendChild: (node) => addedNodes.push(node),
      contains: () => true,
      removeChild: () => {},
    },
    documentElement: {
      classList: {
        contains: (cls) => cls === 'dark', // dark mode
      },
    },
  };

  const fakeWindow = {
    scrollTo: () => {},
  };

  const mod = runner({
    document: fakeDocument,
    window: fakeWindow,
    setTimeout: (fn) => fn(),
  });

  let navigated = false;
  mod.triggerRouteTransition(() => {
    navigated = true;
  }, true);

  assert.equal(navigated, true);
  assert.equal(addedNodes.length, 1);
  const container = addedNodes[0];
  assert.equal(container.children.length, 5);
  // Dark mode uses #061614
  for (const strip of container.children) {
    assert.equal(strip.style.backgroundColor, '#061614');
  }
});

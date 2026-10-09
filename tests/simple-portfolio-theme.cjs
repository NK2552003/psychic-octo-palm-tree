const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('simpler version top image has portraitWrapper and theme-according overlay filter', () => {
  const pageSource = fs.readFileSync('app/simple/page.tsx', 'utf8');
  const cssSource = fs.readFileSync('app/simple/simple.module.css', 'utf8');

  // Verify top image is enclosed in portraitWrapper with portraitOverlay
  assert.ok(pageSource.includes('styles.portraitWrapper'), 'Top image must have portraitWrapper');
  assert.ok(pageSource.includes('styles.portraitOverlay'), 'Top image must have portraitOverlay');

  // Verify CSS contains theme-based overlay filter matching HeroRight
  assert.ok(cssSource.includes('.portraitOverlay'), 'CSS must define portraitOverlay');
  assert.ok(cssSource.includes(':global(.dark) .portraitOverlay'), 'CSS must define dark mode portraitOverlay');
  assert.ok(cssSource.includes('mix-blend-mode: color'), 'Dark mode must use mix-blend-mode: color');
  assert.ok(cssSource.includes('rgba(13, 148, 136'), 'Dark mode must use teal overlay color');
  assert.ok(cssSource.includes(':global(.dark) .portraitWrapper'), 'Dark mode must update border color');
  assert.ok(cssSource.includes('#0c3a3a'), 'Dark mode must use #0c3a3a border matching HeroRight');

  // Verify bottom photos do not have portraitOverlay
  assert.ok(!pageSource.includes('photos.portraitOverlay'), 'Bottom photos must not be altered');
});

test('simpler version places projects section below experience and certifications', () => {
  const pageSource = fs.readFileSync('app/simple/page.tsx', 'utf8');

  const learningIndex = pageSource.indexOf('id="learning"');
  const projectsIndex = pageSource.indexOf('id="projects"');
  const toolsIndex = pageSource.indexOf('id="tools"');
  const educationIndex = pageSource.indexOf('id="education"');

  assert.ok(learningIndex !== -1, 'learning section exists');
  assert.ok(projectsIndex !== -1, 'projects section exists');
  assert.ok(toolsIndex !== -1, 'tools section exists');
  assert.ok(educationIndex !== -1, 'education section exists');

  // Verify projects is placed below learning (Experience & certifications)
  assert.ok(projectsIndex > learningIndex, 'projects section must be below experience and certifications');
  // Verify tools and education stay above learning
  assert.ok(toolsIndex < learningIndex, 'tools must be above learning');
  assert.ok(educationIndex < learningIndex, 'education must be above learning');
});

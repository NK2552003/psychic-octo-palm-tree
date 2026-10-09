import { liveWebsitesData, publishedExtensionsData } from './portfolio-projects';
import { qualificationsData } from './portfolio-qualifications';

export const portfolioStack = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Node.js', 'REST APIs', 'Supabase', 'Firebase', 'Flutter', 'Dart', 'Python', 'Java', 'Git', 'Docker', 'CI/CD', 'AWS', 'Hadoop', 'Spark', 'UI/UX', 'Accessibility'];
export const suggestedQuestions = [
  'Who is Nitish?', 'What projects has he built?', 'What is his tech stack?',
  'Tell me about his education', 'What extensions has he published?',
  'Does he build mobile apps?', 'Where can I see his photography?', 'How can I contact him?',
];
export type Answer = { text: string; sources: { label: string; href: string }[]; topic?: string };
type Fact = { id: string; title: string; text: string; keywords: string; href: string };
const projects = [...liveWebsitesData, ...publishedExtensionsData];
const facts: Fact[] = [
  {id:'about',title:'About Nitish',text:'Nitish Kumar is a full-stack developer, photographer, and B.Tech Computer Science & Engineering graduate based in Haryana, India. He builds web applications, mobile apps, and developer tools, and expresses his creativity through nature and wildlife photography.', keywords:'who about introduction introduce overview bio background summary nitish location lives based haryana india',href:'#intro'},
  {id:'stack',title:'Tech stack',text:`His stack includes ${portfolioStack.join(', ')}. His work spans frontend interfaces, backend systems, cross-platform mobile apps, deployment, and accessible UI design.`,keywords:'stack skills technology technologies languages frontend backend expertise know use programming',href:'#stack'},
  {id:'projects',title:'Projects',text:liveWebsitesData.map(p=>`${p.name}: ${p.description}`).join('\n\n'),keywords:'projects built build work portfolio applications websites shipped showcase',href:'#projects'},
  {id:'tools',title:'Extensions & packages',text:publishedExtensionsData.map(p=>`${p.name}: ${p.description}`).join('\n\n'),keywords:'extensions packages tools published marketplace vscode vs code plugins libraries',href:'#tools'},
  {id:'education',title:'Education',text:qualificationsData.filter(q=>q.category==='Education').slice().reverse().map(q=>`${q.title} — ${q.institution} (${q.duration}). ${q.description}`).join('\n\n'),keywords:'education college university degree graduate graduation btech b tech school cgpa marks academic qualifications studied study',href:'#education'},
  {id:'learning',title:'Experience & certifications',text:qualificationsData.filter(q=>q.category==='Certifications').map(q=>`${q.title} — ${q.institution} (${q.duration}). ${q.description}`).join('\n\n'),keywords:'experience internship intern training course courses certification certifications learning udemy internshala',href:'#learning'},
  {id:'mobile',title:'Mobile development',text:'Nitish works with Flutter and Dart for cross-platform mobile development. QuietNote is his offline-first app for private notes and planning. He also published quiet_dock, a Flutter navigation package with swipeable pages, quick actions, and a wide-screen rail.',keywords:'mobile phone android ios flutter dart apps application cross platform',href:'#tools'},
  {id:'photography',title:'Photography',text:'Nitish enjoys nature and wildlife photography. Browse the photographs below or find his work on Instagram (@natur_hacks), DeviantArt (sidkr222003), and YouPic (nitish).',keywords:'photography photographs photo photos camera nature wildlife hobby hobbies lens instagram pictures',href:'#photography'},
  {id:'contact',title:'Contact Nitish',text:'Email Nitish at nk2552003@gmail.com to discuss a project or connect. You can also find him on GitHub and LinkedIn as nk2552003. Availability, rates, and project timelines should be confirmed with him directly.',keywords:'contact email reach connect hire hiring available availability freelance job work together message social linkedin github',href:'#contact'},
  {id:'recognition',title:'Recognition',text:'His interactive portfolio received Astonishing Awards’ Project Of The Day on October 7, 2026, and is a WDAwards nominee.',keywords:'award awards recognition achievement achievements nominee winning',href:'#recognition'},
  {id:'writing',title:'Writing & experiments',text:'Nitish shares technical articles on DEV, CSS and JavaScript experiments on CodePen, and reusable interface components on UIverse. Links are in the Writing & experiments section.',keywords:'writing blog blogs articles devto dev experiments codepen uiverse',href:'#elsewhere'},
  ...projects.map(p=>({id:p.id,title:p.name,text:`${p.name}: ${p.description}\n\nTechnologies and focus: ${p.tags.join(', ')}.`,keywords:`${p.name} ${p.tags.join(' ')} ${p.id}`,href:p.url})),
];
const stop = new Set('a an the is are was were i you he she his her him it its this that they their me my we our can could do does did what which who how where when why tell about please some more of in on at to for and or with has have built build nitish kumar'.split(' '));
function normalize(text: string) { return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
function tokens(text: string) { return [...new Set(normalize(text).split(' ').filter(t=>t.length>1 && !stop.has(t)))]; }
function fromFact(fact: Fact): Answer { return {text:fact.text,sources:[{label:fact.title,href:fact.href}],topic:fact.id}; }
export function answerPortfolioQuestion(question: string, previousTopic?: string): Answer {
  const q = normalize(question.slice(0, 500));
  if (/^(hi|hello|hey|namaste|thanks|thank you)$/.test(q)) return {text:'Hi! I can help you explore Nitish’s projects, skills, education, photography, and contact details. Choose a suggested question or ask your own.',sources:[]};
  if (/^(tell me more|more|go on|what else|tell me more about it)$/.test(q) && previousTopic) {
    const fact=facts.find(f=>f.id===previousTopic);
    if(fact) return {...fromFact(fact),text:`Here are the details available in this portfolio:\n\n${fact.text}`};
  }
  // Explicit names win over general topic words, including multi-project questions.
  const named = facts.filter(f=>projects.some(p=>p.id===f.id) && q.includes(normalize(f.title)));
  if(named.length) return {text:named.map(f=>f.text).join('\n\n'),sources:named.map(f=>({label:f.title,href:f.href})),topic:named[0].id};
  if (/\b(who is|who s|introduce|about nitish|about him|summary|overview)\b/.test(q)) return fromFact(facts[0]);
  // Never infer personal facts, live availability, or employment history from project descriptions.
  if (/\b(age|birthday|salary|married|girlfriend|phone|religion|address|resume|cv|years of experience|current employer)\b/.test(q)) return {text:'That detail isn’t listed in this portfolio. Please contact Nitish directly for an accurate answer.',sources:[{label:'Contact Nitish',href:'#contact'}]};
  const terms=tokens(q);
  const scored=facts.map(f=>{
    const keys=tokens(f.keywords); const body=tokens(f.text);
    const matches=terms.filter(t=>keys.includes(t));
    const score=matches.length*4+terms.filter(t=>body.includes(t)).length;
    return {fact:f,score,coverage:terms.length ? matches.length/terms.length : 0};
  }).sort((a,b)=>b.score-a.score);
  const best=scored[0];
  if(!terms.length || best.score<4 || best.coverage<0.34) return {text:'I couldn’t find a reliable answer in Nitish’s portfolio. Try asking about a named project, skills, education, photography, or contact details. I work from the portfolio’s saved facts and don’t search the web or invent answers.',sources:[]};
  return fromFact(best.fact);
}

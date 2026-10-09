import { redirect } from 'next/navigation';

export default function UnsupportedBrowserPage() {
  redirect('/simple');
}

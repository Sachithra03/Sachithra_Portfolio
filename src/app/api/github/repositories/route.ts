import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/Sachithra03', {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`[GitHub API] Profile request failed with status ${response.status}`);
      return NextResponse.json({ error: 'GitHub repository count unavailable' }, { status: 502 });
    }

    const profile: { public_repos?: unknown } = await response.json();
    if (typeof profile.public_repos !== 'number' || !Number.isInteger(profile.public_repos)) {
      console.error('[GitHub API] Profile response did not contain a valid repository count');
      return NextResponse.json({ error: 'GitHub repository count unavailable' }, { status: 502 });
    }

    return NextResponse.json({ count: profile.public_repos });
  } catch (error: unknown) {
    console.error('[GitHub API] Failed to fetch public repository count:', error);
    return NextResponse.json({ error: 'GitHub repository count unavailable' }, { status: 502 });
  }
}

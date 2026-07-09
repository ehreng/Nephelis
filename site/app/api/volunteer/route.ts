import { NextRequest, NextResponse } from 'next/server';
import {
  addToAudience,
  autoReply,
  notifyTeam,
  volunteerAutoReply,
} from '@/lib/leads';

const SKILL_LABELS = [
  'structures',
  'avionics',
  'software',
  'ai',
  'fabrication',
  'science',
  'ops',
  'design',
  'other',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const skills: string[] = Array.isArray(body.skills)
      ? body.skills.map(String).filter((s: string) => (SKILL_LABELS as readonly string[]).includes(s))
      : [];

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    await addToAudience({
      email,
      firstName: name.split(' ')[0],
      tags: ['volunteer'],
    });

    const skillsLine = skills.length ? skills.join(', ') : 'unspecified';

    const team = await notifyTeam({
      fromKind: 'crew',
      replyTo: email,
      subject: `Volunteer: ${name} [${skillsLine}]`,
      html: `
        <h2>New Volunteer</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Skills:</strong> ${skillsLine}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap">${message || '(none)'}</pre>
        <p><strong>At:</strong> ${new Date().toISOString()}</p>
      `,
      text: `Volunteer: ${name}\nEmail: ${email}\nSkills: ${skillsLine}\n\n${message}\n`,
    });

    if (!team.ok) {
      return NextResponse.json(
        { error: typeof team.error === 'string' ? team.error : 'Failed to send' },
        { status: 500 }
      );
    }

    // Optional: open GitHub issue when token + repo configured
    let issueUrl: string | null = null;
    const ghToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    const ghRepo = process.env.GITHUB_VOLUNTEER_REPO || 'ehreng/Nephelis';
    if (ghToken) {
      try {
        const res = await fetch(`https://api.github.com/repos/${ghRepo}/issues`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify({
            title: `Volunteer: ${name} (${skillsLine})`,
            body: [
              `**Name:** ${name}`,
              `**Email:** ${email}`,
              `**Skills:** ${skillsLine}`,
              '',
              message || '_No message_',
              '',
              `_Submitted ${new Date().toISOString()}_`,
            ].join('\n'),
            labels: ['volunteer'],
          }),
        });
        if (res.ok) {
          const issue = await res.json();
          issueUrl = issue.html_url || null;
        } else {
          console.warn('GitHub issue create failed:', await res.text());
        }
      } catch (err) {
        console.warn('GitHub issue create error:', err);
      }
    }

    // Optional Discord / Slack webhook
    const webhook = process.env.VOLUNTEER_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `New volunteer: **${name}** (${email}) — skills: ${skillsLine}`,
          }),
        });
      } catch (err) {
        console.warn('Volunteer webhook failed:', err);
      }
    }

    const reply = volunteerAutoReply(name);
    await autoReply({ to: email, fromKind: 'crew', ...reply });

    return NextResponse.json({ success: true, id: team.id, issue_url: issueUrl });
  } catch (err) {
    console.error('Volunteer API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

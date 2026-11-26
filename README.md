# Claude team skills

One master copy of the team's Claude skills, a record of every change, and a one-step way for everyone to get the latest version. Works for claude.ai and Claude Code.

## What's in here
```
plugins/team-skills/skills/<skill>/SKILL.md   one folder per skill (the master copy)
CHANGELOG.md                                  one line per change
.claude-plugin/marketplace.json               lets Claude Code install the skills
scripts/package.ts                            checks each skill and builds dist/<skill>.zip for claude.ai
```

## Using a skill on claude.ai
- Sharing only exists on **Team** and **Enterprise** plans. On individual plans, each person uploads their own copy.
- Upload: Customize > Skills > + > Create skill > Upload a skill, then pick `dist/<skill>.zip`.
- Share with people: the skill's ⋯ menu > Share. They see it greyed out until they switch it on.
- Share with everyone: ⋯ menu > Publish to org (may need review, depending on the org's settings).

## Using the skills in Claude Code
```
/plugin marketplace add li-zck/claude-team-skills
/plugin install team-skills@claude-team-skills
```
Auto-update is off by default. Turn it on in `/plugin` > Marketplaces, or run `/plugin marketplace update claude-team-skills`.

## Changing a skill (maintainer only)
1. Edit `plugins/team-skills/skills/<skill>/SKILL.md`.
2. Raise `version` in that file and in `plugins/team-skills/.claude-plugin/plugin.json` (Claude Code users only get the update when this changes).
3. Add a line to `CHANGELOG.md`.
4. Commit and push.
5. Run `bun run package` and upload the new zip on claude.ai. (Not yet checked: whether people it was shared with get the new upload automatically.)

## "I can't share my skill"
- Your plan is Pro or Max, not Team or Enterprise.
- The org owner turned off skill sharing (Organization settings).
- Your role doesn't have the share permission.
- Code execution is off, so skills show greyed out.
- Upload failed: the zip must contain the skill folder at its root, and the folder name must match the skill's `name`.

Sources: [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude), [Provisioning skills for an organization](https://support.claude.com/en/articles/13119606-provisioning-and-managing-skills-for-your-organization), [Claude Code skills](https://code.claude.com/docs/en/skills), [Plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces).

# Boldr Strengths Site v18

Static, GitHub Pages compatible Boldr CliftonStrengths experience.

## Pages

- `index.html` — Overview and CliftonStrengths framework
- `grid.html` — Explore People: person discovery, Card view and paginated Matrix view
- `insights.html` — Strengths Insights: aggregate patterns, domain/theme representation, location analysis and Excel export
- `profile.html` — Individual strengths profile

## Product structure

- **Explore People** answers *who?* It owns name/role search, Domain, Strength, Department, Location and Status filtering, person cards, individual profiles and the person-by-theme Matrix.
- **Strengths Insights** answers *what patterns?* It owns Location, Department, Status and Top 5/Top 10 analysis scope, aggregate domain/theme analysis, location analysis and the analytical Excel report.
- Shared Location, Department and Status population matching helpers live in `assets/common.js`.

## v18 updates

- Redesigned individual profile **Top themes** into a clear editorial ranking. Rank is now a primary visual anchor, theme names link quietly to Gallup definitions, domain labels are explicit text tags, and descriptions use readable sentence case.
- The section heading now adapts to the ranked data available for each profile, such as `Top 10 themes` or `Top 5 themes`, without implying missing information.
- Moved the **Full 34 report** into a secondary utility row so it no longer competes with the ranked theme heading. Profiles without a complete report now show an explicit unavailable state.
- Redesigned Explore People profile cards so the Top 5 is a breathable ranked list rather than a cluster of tight pills. Cards retain identity, role and department while making rank order easier to scan.
- Completed a site-wide typography readability pass, raising very small labels, captions, helper copy, chart annotations, filter text, profile metadata and footnotes while preserving the existing brand hierarchy.
- Reframed user-facing data language around information maintained by **People Success** rather than file-based source terminology.
- Removed the fixed `126 active strengths profiles` wording from Explore People. The directory now shows dynamic result context without turning the active population into a headline.
- Preserved the approved Strengths Insights Theme Coverage treatment and the v17 Matrix/Insights Excel export behavior.

## Data

The underlying source data structure is unchanged.

- 215 profiles
- 126 Active
- 89 Inactive
- 34 CliftonStrengths themes
- 4 domains

Status rule: ACTIVE = Active; TERMINATED and blank employment status = Inactive.

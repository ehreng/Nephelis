# Cloudseeker visual bible (preview lab)

**Status:** working lock for `/preview/visuals` — not a flight drawing  
**Locked:** 2026-11-12 (rev 3 — flyingprobe identity + practical-requirements hardware floor)  
**Sources:** `flyingprobe.mp4` / `probefly2.mp4`, site schematic, CONOPS v0.9, `docs/practical-requirements-brief.md`

Use this file as the prompt source of truth. Do not invent cloud cities, crew, hanging gondolas, selfie sticks, or a 2027 launch.

## Vehicle (one design, every shot)

The probe is a **single near-perfect sphere**, **4–6 m** (visual nominal **~5 m**). No separate hanging gondola. No fins. No airship hull. The gondola **is** the flush black bay.

| Element | Lock |
|---------|------|
| Upper ~2/3 | Multi-layer semi-translucent **fluoropolymer** envelope. Golden-amber / champagne. **Visible gore seams, reinforcement patches, meridional load tapes**, load-line attachments at an equatorial ring. Light-gray sponsor marks as texture (never bake readable logos). |
| Interface | Equatorial **load ring**: inflation valves, residual tubes, short fittings. Hardware remains after inflate. |
| Lower ~1/3 | The gondola: solid **matte-black** sensor bay, flush with the sphere. **MLI patches, a small radiator or louver, UHF/S-band antenna, sun sensor.** |
| Accent | Bright **cyan-blue glow ring** (`#00F0FF`) at the center of the black bay. |
| Ports | Around the ring: science cameras, **upward cameras looking at the envelope** (sponsor imaging — no selfie stick), mass-spec inlet, nephelometer, aerosol/bio-sensor, T/P/wind. |
| Solar | Polar patch and/or envelope-mounted cells. |
| Relay | Optional 3U CubeSat is a **separate orbiter**. Never on the sphere. |

Engineering CONOPS still lists ~6.6 m / hanging gondola as a mass-budget concept. **Visual lock follows flyingprobe.mp4.** Do not mix the two silhouettes.

## Sponsor imaging (baseline)

Fixed cameras on the bay rim, looking up the envelope toward the polar solar patch and sponsor marks. Ambient Venus light. Acid-resistant windows. Short boom is backup. Through-envelope is last. Selfie stick is out.

## Environment (float shots)

- **55 km** cloud deck. Dense, warm, volumetric orange-gold / amber / bronze. Soft god rays. High filtered sun. Strong rim light on the sphere.
- Black bay in partial shadow; cyan ring stays the cool accent.
- **No Earth blue sky. No black space** behind a floating probe (space is for entry/relay only).

## Palette

- Envelope: champagne `#F3E2C4`, amber `#E8B86D`, gold `#C9923A`
- Clouds: `#E8A05A`, `#C45A20`, `#8A3A12`
- Bay: `#0A0A0A` / `#111111`
- Glow: `#00F0FF` (site `tech`)
- Type on overlays: Inter / JetBrains Mono — never bake long copy into a generation

## Style

Premium scientific visualization + cinematic realism. Sharp fluoropolymer detail, real light transmission, HDR volumetric atmosphere. Hardware stays on the vehicle. Envelope stays a film, not a tin spacecraft.

## Shot list (this lab)

1. flyingprobe source frames (identity)
2. Rev 3 hero with hardware floor (n3-01)
3. Three-quarter seams + load ring (n3-02)
4. Underside sensor suite (n3-03)
5. Equator inflation remnants (n3-04)
6. Bay thermal / antenna / attitude (n3-05)
7. Sponsor-imaging POV up the envelope (n3-06)
8. Three-quarter with antenna (n3-07)
9. Duration comparison (HTML)
10. Minimum viable functional elements (HTML/SVG)

## Do not

People, habitats, cloud cities, fins, hanging gondola, selfie stick, CubeSat-on-sphere, Earth-blue sky, launch-date badges, fake telemetry, metallic overpass that eats the fluoropolymer, “CELESTIAL VISTA” interiors.

## Rejection log

- Round 1 hanging crate gondola — retired silhouette.
- n2-r hanging pod — 3/4 drift; bay must stay flush.
- n3-r too metallic — hardware must not turn the envelope into tin.

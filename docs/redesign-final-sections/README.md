# PJP final sections review

Open **http://localhost:5173/prototype-final.html**. The top review bar switches three working concepts. **A / Industrial Editorial is recommended.** “Versi saat ini” opens the approved homepage for comparison.

The prerendered build also runs at **http://localhost:4173/prototype-final.html** with the approved homepage/gallery copied into the local review bundle. Nothing is deployed.

Read:

1. [Research, evidence levels and 12-reference shortlist](RESEARCH.md)
2. [Three concepts and recommendation](CONCEPTS.md)
3. [Implementation boundary](PLAN.md)
4. [Build, QA, file list, backup and limitations](QA.md)

Look:

- [Final desktop](screenshots/editorial-1440.jpg)
- [Final tablet](screenshots/editorial-768.jpg)
- [Final mobile](screenshots/editorial-390.jpg)
- [Desktop before/after](screenshots/comparison-1440.jpg)
- [Mobile before/after](screenshots/comparison-390.jpg)
- [Reference inventory sheet](inventory-1.jpg)

If servers need restarting, from `C:\Projects\PJP-Website`:

```powershell
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Build the separate review bundle after the ordinary approved build:

```powershell
npm.cmd run build
node scripts/build-final-sections.mjs
npm.cmd run preview -- --outDir preview/final-sections --host 127.0.0.1 --port 4173 --strictPort
```

The approved source files remain unchanged; a pre-prototype backup is at `C:\Projects\PJP-Website-backups\final-sections-prototype-20261118\`. This prototype is ready for evaluation before any homepage integration.

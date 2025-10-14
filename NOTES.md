# Notes

## Build Checklist

- [ ] Build and test new version with `npm run build.ext`
- [ ] **Confirm the new version is ready for release**
- [ ] Increment the version in `addon/manifest.json`
- [ ] Add new section to `CHANGELOG.md` including `Added` and `Fixed` subheadings
- [ ] Sign and submit to AMO with `npm run sign`
- [ ] Commit and push everything in repo
- [ ] Create a new release in GitHub
- [ ] Add new entry to `updates.json`
- [ ] Commit and push again

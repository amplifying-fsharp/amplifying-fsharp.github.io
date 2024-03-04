// Generate the Markdown for all the backers in our README.md file
// Run `node backers.js` or `bun backers.js`.
const json = await fetch(
  "https://opencollective.com/amplifying-fsharp/members/all.json",
).then((response) => response.json());

Array.from(json)
  .filter((b) => b.isActive && b.role === "BACKER")
  .forEach((b) => {
    const { name, profile, image, company } = b;
    const markdownImage = !image ? "" : `![${name}](${image}&s=50) `;
    const andCompany = company ? `, ${company}` : "";
    console.log(`${markdownImage}[${name}${andCompany}](${profile})\n`);
  });

# Amplifying F# website

This is the source code for [https://amplifyingfsharp.io/](https://amplifyingfsharp.io/).

## May F# be with you

Amplifying F# has come to an end. The people behind it have moved on and are no longer active as an initiative.  
The website stays online for anyone who wants to look back at the sessions and blog posts.

## Open Collective

We are very grateful to everyone who supported us through our [Open Collective](https://opencollective.com/amplifying-fsharp) over the years. Thank you!

The collective stays open for now because there is still a small balance and it is the easiest way to handle the remaining logistics, but **please do not donate to it any more**.  
If you have a recurring donation set up, we encourage you to cancel it.  
The remaining funds may still be spent on the F# ecosystem at some point, but we have no immediate plans for them.

## The website source code

### Requirements

You need [Bun](https://bun.sh/docs/installation) and the [.NET SDK](https://dotnet.microsoft.com/download) to run this project.

### Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `bun install`     | Installs dependencies                        |
| `bun run dev`     | Starts the local dev server                  |
| `bun run build`   | Builds the production site to `./dist/`      |
| `bun run preview` | Previews the build locally, before deploying |
| `bun run fmt`     | Formats the code with prettier and fantomas  |
| `bun run lint`    | Checks the formatting                        |

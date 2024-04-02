#r "nuget: Fable.Fetch, 2.6.0"

open Fable.Core
open Fetch

type Member = {|
    isActive: bool
    role: string
    name: string
    profile: string
    image: string option
    company: string option
|}

fetch "https://opencollective.com/amplifying-fsharp/members/all.json" []
|> Promise.bind (fun res -> res.json())
|> Promise.iter (fun json ->
    json
    |> JS.Constructors.Array.from<Member>
    |> Array.filter (fun m -> m.isActive && m.role = "BACKER")
    |> Array.iter (fun m ->
        let markdownImage =
            match m.image with
            | None -> ""
            | Some image -> $"![%s{m.name}](%s{image}&s=50) "

        let andCompany =
            match m.company with
            | None -> ""
            | Some company -> $", %s{company}"

        JS.console.log ($"%s{markdownImage}[%s{m.name}%s{andCompany}](%s{m.profile})\n")
    )
)
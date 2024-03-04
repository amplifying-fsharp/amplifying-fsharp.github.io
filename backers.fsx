// Generate the Markdown for all the backers in our README.md file
#r "nuget: FsHttp, 14.4.1"

open System.Text.Json
open FsHttp
open TextCopy

let jsonElement =
    http {
        GET "https://opencollective.com/amplifying-fsharp/members/all.json"
    }
    |> Request.send
    |> Response.toJson

// Convert the JsonElement to an F# list and filter for backers
let backers =
    jsonElement.EnumerateArray()
    |> Seq.filter (fun e -> e.GetProperty("role").GetString() = "BACKER")
    |> Seq.toList

// Example of how to use the backers list
// This will print out the names of the backers
backers
|> List.filter (fun b -> b.GetProperty("isActive").GetBoolean())
|> List.map (fun e -> 
    let name = e.GetProperty("name").GetString()
    let profile = e.GetProperty("profile").GetString()
    let image = e.GetProperty("image").GetString()
    let company = e.GetProperty("company").GetString()

    let markdownImage = if isNull image then "" else $"![%s{name}](%s{image}&s=50)"

    $"%s{markdownImage}[%s{name}, %s{company}](%s{profile})\n"
)
|> String.concat "\n"
|> printfn "%s"
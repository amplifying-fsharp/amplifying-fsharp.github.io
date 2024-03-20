#r "nuget: FsHttp"

open System.Collections.Generic
open FsHttp

Fsi.disableDebugLogs ()

type Transaction = {| createdByUser: obj; amount: int |}
type OpenCollectiveResponse = {| result: Transaction array |}

let openCollectiveResponse =
    http {
        GET
            "https://opencollective.com/v1/collectives/amplifying-fsharp/transactions?dateFrom=2024-01-01&dateTo=2024-12-31"

        CacheControl "no-cache"
    }
    |> Request.send
    |> Response.deserializeJson<OpenCollectiveResponse>

let total =
    openCollectiveResponse.result
    |> Array.map (fun t -> if isNull t.createdByUser then 0 else t.amount)
    |> Array.sum
    |> fun sum -> sum / 100

printfn "Total collected: $%i" total

type ExchangeRateResponse = {| rates: Dictionary<string, float> |}

let exchangeRateResponse =
    http {
        GET "https://api.frankfurter.app/latest?from=USD&to=GBP"
        CacheControl "no-cache"
    }
    |> Request.send
    |> Response.deserializeJson<ExchangeRateResponse>

let rate = exchangeRateResponse.rates.["GBP"]
printfn "Current exchange rate $ to £: %.02f" rate

let totalInPounds = float total * rate

if totalInPounds > 5000 then
    printfn $"Edgar should have blue hair, raised £%f{totalInPounds}"
else
    printfn $"No blue hair yet, currently at £%.02f{totalInPounds}"

module Components.Time

open Fable.Core
open type React.React
open React.DSL
open type React.DSL.DOMProps

let useEffect : System.Action<(unit -> (unit -> unit)), obj array> =
    JsInterop.import "useEffect" "react"

[<ExportDefault>]
let Time () : JSX.Element =
    let time, setTime = useState System.DateTime.Now

    useEffect.Invoke (
        fun () ->
            let key = JS.setInterval (fun () -> setTime System.DateTime.Now) 1000
            fun () -> JS.clearInterval key
        , Array.empty
    )

    h5 [] [ str $"Time: %s{time.ToLongTimeString ()}" ]

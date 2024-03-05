module Components.SessionsGrid

open Fable.Core
open React
open type React.DSL.DOMProps

type SessionsGridProps =
    {|
        foo: string
    |}

[<ExportDefault>]
let SessionsGrid (props: obj) : JSX.Element =
    let props = props :?> SessionsGridProps
    let count, setCount = React.useState 0
    
    div [] [
        str "Yup zeg!"
        str props.foo
        br []
        str (string count)
        br []
        button [ OnClick (fun _ -> setCount (count + 1)) ] [ str "doe mo" ]
    ]

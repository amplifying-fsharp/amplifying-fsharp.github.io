module Components.JoinUsForm

open Fable.Core
open React
open type React.DSL.DOMProps

type JoinUsFormProps = {| propName : string |}

[<ExportDefault>]
let JoinUsForm (props : JoinUsFormProps) : JSX.Element = div [] [ str "Hello from JoinUsForm" ]

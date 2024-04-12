module Components.JoinUsForm

open Fable.Core

type JoinUsFormProps = {| propName : string |}

[<ExportDefault>]
val JoinUsForm : props : unit -> JSX.Element

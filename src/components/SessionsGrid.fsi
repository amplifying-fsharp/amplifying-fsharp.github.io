module Components.SessionsGrid

open Fable.Core
open Fable.Core.JS

type Session =
    {|
        id : string
        youtubeId : string
        thumbnail : string option
        title : string
        date : Date
        champion : string
        slug : string
    |}

type SessionsGridProps = {| sessions : Session array |}

[<ExportDefault>]
val SessionsGrid : props : SessionsGridProps -> JSX.Element

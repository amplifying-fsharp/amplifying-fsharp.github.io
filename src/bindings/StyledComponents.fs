module StyledComponents

open Fable.Core
open Fable.Core.JsInterop

let styled : obj = import "styled" "styled-components"

let inline mkStyleComponent tag css =
    emitJsExpr (styled, tag, css) """$0[$1]`${$2}`"""

let inline styledComponent (element : JSX.ElementType) (children : JSX.Element seq) : JSX.Element =
    JSX.create element [ "children", children ]

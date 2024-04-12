module Components.JoinUsForm

open Fable.Core
open type React.React
open React.DSL
open type React.DSL.DOMProps
open StyledComponents

type JoinUsFormProps = {| propName : string |}

let StyledElement : JSX.ElementType =
    mkStyleComponent
        "form"
        """
background-color: var(--cyan-300);
padding: var(--spacing-200);
max-width: var(--container-sm);

> div {
margin-bottom: var(--spacing-500);

> label {
    display: block;
    margin-bottom: var(--spacing-200);
    font-weight: 500;
}

> input[type="text"],
> textarea {
    outline: 2px solid var(--cyan-700);
    border: none;
    border-radius: var(--radius);
    padding: var(--spacing-100);

    &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    }

    @media screen and (min-width: 768px) {
    min-width: 50%;
    }
}

.form-text {
    color: var(--cyan-800);
    margin-block: var(--spacing-300);
}
}

#itch-container {
display: flex;
border: 2px solid var(--cyan-200);
border-radius: var(--radius);
background-color: var(--cyan-50);
input[type="radio"] {
    display: none;
}

label {
    color: var(--cyan-800);
    flex: 1;
    @media screen and (min-width: 768px) {
    white-space: nowrap;
    }
    border-radius: var(--radius);
    display: block;
    padding: var(--spacing-100) var(--spacing-200);
    cursor: pointer;

    &:hover {
    background-color: var(--cyan-600);
    color: var(--white);
    outline: 2px solid var(--cyan-700);
    }

    &:active {
    background-color: var(--cyan-900);
    }
}

input[type="radio"]:checked + label {
    outline: 2px solid var(--cyan-700);
    color: var(--cyan-900);

    &:hover {
    color: var(--white);
    }
}
}

button[type="submit"] {
background-color: var(--cyan-800);
color: var(--white);
float: right;

&:hover {
    background-color: var(--cyan-700);
}

&:active {
    background-color: var(--cyan-900);
}
}
"""

[<ExportDefault>]
let JoinUsForm () : JSX.Element =
    let linkRef = useRef ()

    styledComponent StyledElement [
        div [] [
            label [] [ str "Your name?" ; strong [] [ str "&nbsp;&#x2a;" ] ]
            input [ Type "text" ; Placeholder "John Doe" ; Required true ]
        ]
        div [] [
            label [] [ str "Company name?" ]
            input [ Type "text" ; Placeholder "Contoso Inc" ; Required true ]
            div [ ClassName "form-text" ] [
                str "Don't worry this field is optional, you are also most welcome as an individual contributor."
            ]
        ]
        div [] [
            label [] [ str "Your timezone?" ; strong [] [ str "&nbsp;&#x2a;" ] ]
            input [ Type "text" ; Placeholder "CET" ; Required true ]
        ]
        div [] [
            label [] [ str "Your topic?" ; strong [] [ str "&nbsp;&#x2a;" ] ]
            input [ Type "text" ; Placeholder "Working on Ionide" ; Required true ]
        ]
        div [] [
            label [] [
                str "What kind of itch do you have?"
                strong [] [ str "&nbsp;&#x2a;" ]
                div [ Id "itch-container" ] [
                    input [
                        Type "radio"
                        Name "itch"
                        AutoComplete "off"
                        Required true
                        Value "issue"
                        Checked true
                    ]
                    label [ "for", "issue" ] [ str "Fix a specific issue" ]
                    input [
                        Type "radio"
                        Name "itch"
                        AutoComplete "off"
                        Required true
                        Value "project"
                    ]
                    label [ "for", "project" ] [ str "Work on a specific project" ]
                    input [
                        Type "radio"
                        Name "itch"
                        AutoComplete "off"
                        Required true
                        Value "unknown"
                    ]
                    label [ "for", "unknown" ] [ str "Still trying to figure it out." ]
                ]
            ]
        ]
        // if "issue"
        div [] [
            label [] [ str "Issue link" ]
            input [ Type "text" ; Placeholder "A link to a specific OSS issue" ; Required false ]
        ]
        // if "project"
        div [] [
            label [] [ str "Project link" ]
            input [
                Type "text"
                Placeholder "A link to your favorite OSS project."
                List "projects"
                Required false
            ]
            datalist [ Id "projects" ] [
                option [] [ str "https://github.com/dotnet/fsharp" ]
                option [] [ str "https://github.com/fsharp/fsautoComplete" ]
                option [] [ str "https://github.com/JetBrains/resharper-fsharp" ]
                option [] [ str "https://github.com/ionide/proj-info" ]
                option [] [ str "https://github.com/ionide/ionide-vscode-fsharp" ]
                option [] [ str "https://github.com/fsprojects/fantomas" ]
                option [] [ str "https://github.com/fsprojects/FSharp.Formatting" ]
            ]
        ]
        // if "unknown"
        div [] [
            label [] [ str "Tell us about your quest?" ]
            textarea [
                Placeholder "Describe the change you want to see in the world."
                Rows 3
                Required false
            ] []
        ]
        div [] [
            label [] [ str "Is there anything else we need to know?" ]
            textarea [ Placeholder "Tell us what motivates you!" ; Rows 3 ] []
        ]
        button [ Type "submit" ] [ str "Submit" ]
        a [ Href "#" ; "ref", linkRef ; Target "_blank" ] []

    ]

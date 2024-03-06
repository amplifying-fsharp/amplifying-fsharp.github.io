module Components.SessionsGrid

open System
open Fable.Core
open React
open type React.DSL.DOMProps
open StyledComponents

let StyledDiv =
    mkStyleComponent
        "div"
        """
.grid-container {
  margin-bottom: var(--spacing-300);

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-300);
  }
}

.grid-container a {
  display: block;
  box-sizing: border-box;
  text-decoration: none;
  color: var(--white);
  margin-bottom: var(--spacing-300);
  position: relative;
  padding: var(--spacing-300);
  aspect-ratio: 16 / 9;
  background-size: contain;
  transition: all 200ms;

  & h3 {
    margin-top: 0;
  }

  & h4 {
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    width: calc(var(--container-sm) / 2 - var(--spacing-300));

    & h3 {
      font-size: var(--font-400);
    }

    & h4 {
      font-size: var(--font-300);
    }
  }

  @media screen and (min-width: 1024px) {
    width: calc(var(--container-xl) / 3 - var(--spacing-300));

    & h3 {
      font-size: var(--font-500);
    }

    & h4 {
      font-size: var(--font-400);
    }
  }

  @media screen and (min-width: 1200px) {
    width: calc(var(--container-xxl) / 3 - var(--spacing-300));
  }
}

#upcoming-sessions a {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  transition: all 200ms;

  &:hover {
    box-shadow: 0 2px 2px var(--shadow-color);
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h4 {
      font-size: 1rem;
      text-align: right;
    }

    > time {
      font-weight: bold;
      font-size: 1rem;
    }
  }
}

#upcoming-sessions a:nth-child(3n + 1) {
  background-color: var(--cyan-500);
  color: var(--white);

  &:hover {
    outline: 1px solid var(--cyan-200);
  }
}

#upcoming-sessions a:nth-child(3n + 2) {
  background-color: var(--yellow-400);
  color: var(--key-950);
  outline: 1px solid transparent;

  &:hover {
    outline: 1px solid var(--yellow-200);
  }
}

#upcoming-sessions a:nth-child(3n + 3) {
  background-color: var(--magenta-500);
  color: var(--white);

  &:hover {
    outline: 1px solid var(--magenta-200);
  }
}

#past-sessions a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  & h4 {
    text-align: right;
  }

  & h3,
  & h4 {
    z-index: 1;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 0;
    transition: all 200ms;
  }

  &:hover {
    color: var(--white);
  }

  &:nth-child(3n + 1):hover .overlay {
    background-color: rgba(34, 238, 235, 0.33);
    outline: 3px solid var(--cyan-50);
  }

  &:nth-child(3n + 2):hover .overlay {
    background-color: rgba(255, 249, 137, 0.4);
    outline: 3px solid var(--yellow-50);
  }

  &:nth-child(3n + 3):hover .overlay {
    background-color: rgba(204, 164, 206, 0.33);
    outline: 3px solid var(--magenta-50);
  }
}

#no-new-sessions {
  background: var(--magenta-900);
  display: block;
  width: 300px;
  color: var(--white);
  font-size: var(--font-400);
  padding: var(--spacing-300);
  border-radius: var(--radius);
  margin: auto;
  text-align: center;
}

#no-new-sessions a {
  color: var(--magenta-400);
  margin-left: var(--spacing-100);
}
"""

type Session =
    {|
        id : string
        youtubeId : string
        thumbnail : string option
        title : string
        date : JS.Date
        champion : string
        slug : string
    |}

type SessionsGridProps = {| sessions : Session array |}

let convertJsDateToDateTimeSimple (jsDate : JS.Date) : DateTime =
    // Extract components from the JS Date
    let year = int (jsDate.getFullYear ())
    let month = int (jsDate.getMonth () + 1.) // JS months are 0-based
    let day = int (jsDate.getDate ())
    let hour = int (jsDate.getHours ())
    let minute = int (jsDate.getMinutes ())
    // Construct a .NET DateTime
    System.DateTime (year, month, day, hour, minute, 0, DateTimeKind.Local)

[<ExportDefault>]
let SessionsGrid (props : SessionsGridProps) : JSX.Element =
    let pastSessions, upcomingSessions =
        props.sessions
        |> Array.sortByDescending (fun session -> convertJsDateToDateTimeSimple session.date)
        |> Array.partition (fun session ->
            let date = convertJsDateToDateTimeSimple session.date
            date < DateTime.Now.AddHours 2
        )

    styleComponent StyledDiv [
        if Array.isEmpty upcomingSessions then
            p [ Key "no-upcoming-sessions" ; Id "no-new-sessions" ] [
                str "No news sessions in sight 😔."
                br []
                str "Please submit one "
                a [ Href "/join-us" ] [ str "here" ]
                str "!"
            ]
        else
            fragment [ Key "has-upcoming-sessions" ] [
                h2 [] [ str "On the next Amplifying F#!" ]
                div [ Id "upcoming-sessions" ; ClassName "grid-container" ] [
                    for session in upcomingSessions do
                        a [ Href $"/sessions/%s{session.slug}" ; Key session.id ] [
                            h3 [] [ str session.title ]
                            div [] [
                                time [] [ str (session.date.toLocaleDateString ()) ]
                                h4 [] [ str session.champion ]
                            ]
                        ]
                ]
            ]
        fragment [ Key "past-sessions" ] [
            h2 [] [ str $"Past sessions (%i{pastSessions.Length})" ]
            div [ Id "past-sessions" ; ClassName "grid-container" ] [
                for session in pastSessions do
                    let thumbnail =
                        if String.IsNullOrWhiteSpace session.youtubeId then
                            $"url({session.thumbnail})"
                        else
                            $"url('https://img.youtube.com/vi/%s{session.youtubeId}/mqdefault.jpg')"

                    a [
                        Href $"/sessions/%s{session.slug}"
                        Key session.id
                        Style
                            {|
                                background = thumbnail
                                backgroundSize = "cover"
                                backgroundBlendMode = "multiply"
                                backgroundColor = "grey"
                            |}
                    ] [
                        div [ ClassName "overlay" ] []
                        h3 [] [ str session.title ]
                        h4 [] [ str $"with %s{session.champion}" ]
                    ]
            ]
        ]
    ]

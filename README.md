# patient-feedback-app
A proof-of-concept program to collect patient feedback after an appointment.
## Architecture Diagram
```
┌──────────────────────────────────────────────────────────────────────────┐
│                                    CLIENT                                │
│                                                                          │
│   ┌───────────────┐    ┌─────────────────┐   ┌─────────────────┐         │
│   │               │    │                 │   │                 │         │
│   │ Patient       │    │  Feedback       │   │  Feedback       │         │
│   │ Data          │    │  Questions      │   │  Answers        │         │
│   │               │    │                 │   │                 │         │
│   └────▲──────────┘    └───▲─────────────┘   └──────▲──────────┘         │
│        │ GET               │ GET                    │ POST               │
│        │                   │                        │                    │
│        │                   │                        │                    │
└────────┼───────────────────┼────────────────────────┼────────────────────┘
        J│                  J│                       J│
        S│                  S│                       S│
        O│                  O│    HTTP               O│
        N│                  N│                       N│
┌────────┼───────────────────┼────────────────────────┼────────────────────┐
│        │                   │                        │                    │
│    ┌───▼────────────┐   ┌──▼───────────────┐    ┌───▼────────────┐       │
│    │                │   │                  │    │                │       │
│    │ /api/patient   │   │ /api/feedback    │    │ /api/feedback  │       │
│    │                │   │ /question        │    │ /answer        │       │
│    │                │   │                  │    │                │       │
│    └────────▲───────┘   └────▲─────────────┘    └─┬──────────────┘       │
│             │                │                    │                      │
│             │                │   API SERVER       │                      │
└─────────────┼────────────────┼────────────────────┼──────────────────────┘
              │                │                    │
              │                │                    │
 ┌────────────┴────────────────┴────────────────────▼──────────────────────┐
 │                                                                         │
 │                                                                         │
 │                             JSON FILES                                  │
 │                                                                         │
 │                                                                         │
 └─────────────────────────────────────────────────────────────────────────┘
 ```
## Code Overview
I focused on simplicity to avoid any rabbit holes or time sinks. I made sure to triage, establishing functional requirements before moving on to 'nice to have' features. I had the questions come from the backend to allow for the possibility of a more dynamic/different list of questions. I structured the feedback as an html form to allow for better handling by screen readers and generally for accessibility. 

### Go/Backend
I used the standard `http` library instead of [gorilla/mux](https://github.com/gorilla/mux). I used `JSON` files instead of optionally setting up a database so that I could learn file creation in Go, but also so that learning how to work with `JSON` in Go would be applicable to two parts of the application: the REST API and storing/accessing data.

The REST API is set up with three endpoints: one to send the patient's data, one to send the questions for the patient, and one to receive the answers to those questions.

### React/Frontend
I used `create-react-app` to quickly set up the React framework and `testing-library`. I used `react-hook-form` for the form and inputs because of its compatibility with html tags and use of the hook-style API. 

## Learning
During this project, I learned more than I'd expected. With Go, I learned how to work with `JSON`, how to set up a basic REST API server, and the basics of file creation. Being more familiar with React, I wa In all cases I used the available resources and tutorials on Medium, StackOverflow, and other sites to quickly find answers to my issues.
## Technical Problems

### Testing in Go
I ended up setting up my Go server using `dep`, which was deprecated in favor of Go Modules, but this ended up causing issues with `go test -v` not finding the main module and needing to use `go test -v *.go`. However, even with those changes I wasn't able to get around my issues early enough to be test-driven.
### Testing Mock API Server in React
My testing experience in React is with [Cypress](https://www.cypress.io/). I made the mistake of thinking that there would be more similarities and documentation for `testing-library` than I ended up finding to be as test-driven as I had initially planned to be. I planned in enough buffer time for unforeseen problems and discovered tasks, but ended up having to limit my testing coverage.



## Retrospective Considerations
I enjoyed making this project in the available time. If I were to build upon it, I would move more of the data filtering/process out of javascript and into the backend for speed, better organization, and seperation of concerns. I would move the backend business logic into their own package(s), and I would get better testing coverage on the front- and back-end. 
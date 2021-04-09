# Patient Feedback App
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
┌─────────────┴────────────────┴────────────────────▼──────────────────────┐
│                                                                          │
│                              JSON FILES                                  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
 ```
## Code Overview
A Go API server with a React frontend for the questionnaire. I had the questions come from the backend to allow for the possibility of a more dynamic/different list of questions. I structured the feedback as an html form to allow for better handling by screen readers. 

### Go/Backend
I used the standard `http` library instead of [gorilla/mux](https://github.com/gorilla/mux). I used `JSON` files instead of optionally setting up a database so that I could learn file creation in Go, but also so that learning how to work with `JSON` in Go would be applicable to two parts of the application: the REST API and storing/accessing data.

The REST API is set up with three endpoints: one to send the patient's data, one to send the questions for the patient, and one to receive the answers to those questions.

### React/Frontend
I used [create-react-app](https://github.com/facebook/create-react-app) to quickly set up the React framework and [testing-library](https://testing-library.com/). I used [react-hook-form](https://react-hook-form.com/) for the form and inputs because of its compatibility with html tags and use of the hook-style API. I used [Bulma](https://bulma.io/) as the CSS framework.

## Learning
During this project, I learned more than I'd expected. With Go, I learned how to work with `JSON`, how to set up a basic REST API server, and the basics of file creation. Being more familiar with React, I was In all cases I used the available resources and tutorials on Medium, StackOverflow, and other sites to quickly find answers to my issues.
## Technical Problems
I planned in enough buffer time for unforeseen problems and discovered tasks, but ended up having to limit my testing coverage and pivot to a different CSS Framework.

### Go Modules vs Dep
I ended up setting up my Go server using [dep](https://github.com/golang/dep), which was deprecated in favor of Go Modules, but this ended up causing issues with `go test -v` not finding the main module and needing to use `go test -v *.go`. However, even with those changes I wasn't able to get around my issues early enough to be test-driven.
### Mock API Server in React
My testing experience in React is with [Cypress](https://www.cypress.io/). I had hoped there would be more similarities and documentation for [testing-library](https://testing-library.com/) than I ended up finding, so I ended up being less test-driven than I had initially planned to be. 

### Tailwind CSS Incompatible with CRA
[Tailwind](https://tailwindcss.com/) is an expressive utility-class-based CSS framework. Early on, I checked to see if it would work with [create-react-app](https://github.com/facebook/create-react-app) and saw that extra configuration was needed but that it was possible. Unfortunately, the configuration didn't work because of an optional dependency issue caused by [fsevents](https://github.com/fsevents/fsevents) which thought that my computer was incompatible because it wasn't Mac OS. After trying several methods to fix the issue, I pivoted to using [Bulma](https://bulma.io/). Originally, the form was going to be broken up visually into multi-step cards but time constraints prevented that being implemented.

## Retrospective Considerations
I made sure to triage, setting up both servers and an http connection before moving forward. I am happy with my effort and time-management. All-together, with technical issues and learning, it took about 20 hours.

If I were to build upon it, I would move more of the data filtering/process out of javascript and into the backend for speed, better organization, and seperation of concerns. I would move the backend business logic into their own package(s), and I would get better testing coverage on the front- and back-end. I would also implement the CSS-based multi-step UX instead of the more basic form presented. 

If I were to do it again, I would use a simple state machine with card components and a container in place of the form, or implement a faux chatbot. I would also be interesting to use [Tailwind](https://tailwindcss.com/) on the frontend and [gorilla/mux](https://github.com/gorilla/mux) in the backend.
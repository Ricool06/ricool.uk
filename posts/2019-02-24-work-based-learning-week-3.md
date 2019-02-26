---
path: "/work-based-learning-week-3"
date: "2019-02-24"
title: "Work based learning: Week 3"
---
### What I did this week

#### Day 1
The routine was starting to set in. The work we were tasked with accomplishing was already laid out from last week, so we set in to discover the capabilities of the next framework: [Fabric.js](http://fabricjs.com/). Fabric offered less opinionated manipulation of the content of the HTML5 canvas, but still retained the serialization features of [GoJS](https://gojs.net/).

The rest of the day was spent working through the same tasks in had completed in previous weeks, but with the new library. Unfortunately, there is not much to be said about this. I suppose repeatedly completing the same task with different libraries can only glean so much new data.

Throughout the day, I conversed with a few co-workers, and noticed that a couple had described some working practices that seemed confusing to me. To preface this, I'm open to hearing corrections from people, just grab me on Twitter for a chat if you feel the need. Anyway, I began to pick up on a few notable points of friction, for example:

+ Notifying all members of a team when a pull request build fails.
+ Tolerance of flaky tests.
+ For any given pull request for the frontend service, integration testing using the backend API in the staging environment.
+ Developers from one team having to ask a team called "DevOps" to make changes to infrastructure _for them_ and not _with them_.

I'll go through these quickly, explaining why I think the might not be the most productive team habits.

##### Fostering a Fear of Mistakes
Aside from the obvious notification spam that occurs as a result of warning an entire team about builds that are pretty much expected to fail regularly, it also has deeper implications on the mindsets of individual team members. The junior developer I spoke with about this issue in particular told me about the embarrassment she felt when her pull request was repeatedly rejected as a result of problems outside of her control. At first glance, this might seem like a good mechanism for ensuring every team member who needs help gets it. But my suspicion is that the notifications would, over time, begin to appear less as a mandate to help out a colleague, and more as an annoyance that would inevitably attach itself to the name of the developer responsible. This can lead to a withdrawal from participation, and a fear of working alone or trying new things that might not work first time.

Given a failing pull request build harms nobody but the developer working on it, the solution seems simple. Instead of trying to automate the process of human interaction, just make sure your team members feel like they can ask for help if they need it. And if you see them struggling on a problem, __talk to them__. Don't rely on a technical solution to a human problem.

##### Flaky Tests
One of the notable gripes with [Protractor](https://github.com/angular/protractor) until recently was its usage of [the WebDriver Control Flow](http://www.protractortest.org/#/control-flow) to manage the execution of asynchronous actions in the browser. For a long time, this caused headaches for testers as [some tests could break the flow of control](https://github.com/SeleniumHQ/selenium/issues/2969) and curse tests with a lack of repeatability. My usage of Protractor often left me wondering how a change to the README file could break an end-to-end test until I discovered [async/await](http://www.protractortest.org/#/async-await).

Flaky tests are worse than useless. They provide false coverage. If they succeed, they provide a false sense of security, and if they fail, they extend lead times. Engineers can so easily become accustomed to the "just run it again" attitude to satisfy the need for a green test log, without really analysing the impact such actions can eventually have on the customer.

Ideally, the goal would be to fix the tests. Having fixed an entire suite of flaky E2E tests in my first job, I know that this kind of task can range from a one line change to a Herculean overhaul spanning weeks. In either case, the first course of action should be to remove the dodgy tests. At least then, the team are aware of a lack of coverage, and can make a note of this technical debt to remedy later. As a bonus, the business is not wasting valuable CPU time (see: money) on the CI server repeatedly running the same dodgy tests. Cha-ching! 🤑

##### Chasing a Moving Target
I think every team is going to have a different way of working. In the case of a product using microservice architecture, this is never more true. The paradigm is still (fairly) young. Most teams continuously iterate through progressively better ways of orchestrating the build, test, and deployment of each service until they reach a comfortable point. One of the pain points of microservices can be finding an appropriate level of mocking and testing in isolation to perform.



#### Day 2

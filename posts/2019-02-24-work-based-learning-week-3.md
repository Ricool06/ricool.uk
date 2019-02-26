---
path: "/work-based-learning-week-3"
date: "2019-02-24"
title: "Work based learning: Week 3"
---
The routine was starting to set in. The work we were tasked with accomplishing was already laid out from last week, so we set in to discover the capabilities of the next framework: [Fabric.js](http://fabricjs.com/).

The rest of the day was spent working through the same tasks we had completed in previous weeks, but with the new library. Unfortunately, there is not much to be said about this. I suppose repeatedly completing the same task with different libraries can only glean so much new data.

Throughout both days, I conversed with a few co-workers, and noticed that a couple had described some working practices that seemed confusing to me. To preface this, I'm open to hearing corrections from anyone, just grab me on [Twitter](https://twitter.com/Ricool06) for a chat if you feel the need. Anyway, I began to pick up on a few noteworthy points of friction, for example:

+ Notifying all members of a team when a pull request build fails.
+ Tolerance of flaky tests.
+ For any given pull request for the frontend service, integration testing using the backend API in the staging environment.
+ Developers from one team having to ask a team called "DevOps" to make changes to infrastructure _for them_ and not _with them_.

I'll go through these quickly, explaining why I think they might not be the most productive team habits.

### Fostering a Fear of Mistakes
Aside from the obvious spam that occurs as a result of regularly warning an entire team about builds that are pretty much expected to fail, it also has deeper implications on the mindsets of individual team members. The junior developer I spoke with about this issue in particular told me about the embarrassment she felt when her pull request was repeatedly rejected as a result of problems outside of her control. At first glance, this might seem like a good mechanism for ensuring every team member who needs help gets it. But my suspicion is that the notifications would, over time, begin to appear less as a mandate to help out a colleague, and more as an annoyance that will attach itself to the name of the developer responsible. This can lead to a withdrawal from participation, and a fear of working alone or trying new things because they might not work first time.

Given a failing pull request build harms precisely nobody, the solution seems simple. Instead of trying to automate the process of human interaction, just make sure your team members feel like they can ask for help if they need it. And if you see them struggling on a problem, __talk to them__. Don't rely on a technical solution to a human problem.

### Flaky Tests
One of the notable gripes with [Protractor](https://github.com/angular/protractor) until recently was its usage of [the WebDriver Control Flow](http://www.protractortest.org/#/control-flow) to manage the execution of asynchronous actions in the browser. For a long time, this caused headaches for testers as [some tests could break the flow of control](https://github.com/SeleniumHQ/selenium/issues/2969) and curse specs with a lack of repeatability. My usage of Protractor often left me wondering how a change to the README file could break an end-to-end test until I discovered [async/await](http://www.protractortest.org/#/async-await).

Flaky tests are worse than useless. They provide fake coverage. If they succeed, they provide a false sense of security, and when they inevitably fail, they extend lead times. Engineers can so easily become accustomed to the "just run it again" mantra to satisfy the need for a green test log, without really analysing the impact such actions can eventually have on the customer.

Ideally, the goal would be to fix the tests. Having fixed an entire suite of flaky E2E tests in my first job, I know that this kind of task can range from a one line change to a Herculean overhaul spanning weeks. In either case, the first course of action should be to remove the dodgy tests. At least then, the team are aware of a lack of coverage, and can make a note of this technical debt to remedy later. As a bonus, the business is not wasting valuable CPU time (see: money) on the CI server repeatedly running the same dodgy tests. Cha-ching! 🤑

### Chasing a Moving Target
I think every team is going to have a different way of working. In the case of a product using microservice architecture, this is never more true. The paradigm is still (fairly) young. Most teams continuously iterate through progressively better ways of orchestrating the build, test, and deployment of each service until they reach a comfortable flow. One of the pain points of microservices can be finding an appropriate level of mocking and testing in isolation to perform.

The decision to run E2E tests by pointing the frontend at the staging environment API seemed to be one of haste. The tests then become subject to any changes to the API's data in this environment. Not to mention the unavoidable slow-down when a change needs to be made to both the frontend and the API. Needing to deploy the API before being able to properly test the frontend means your team is sacrificing the ability to work in parallel for no rational gain.

I'm not going to dictate a solution to this, because every team has its specific workflow and that should (for the most part) be respected. I will state my preference for using a monorepo approach, however, to enable atomic commits. And by the way, [consumer](https://dredd.org) [driven](https://spring.io/projects/spring-cloud-contract) [contracts](https://martinfowler.com/articles/consumerDrivenContracts.html) are your friends.

### Hire People You Trust, & Trust The People You Hire
I'm not going to claim to know exactly what DevOps is to the fullest extent, because when it comes to having a unique definition for that particular term, [everybody and their mums is packin' round here](https://www.youtube.com/watch?v=JurvPFBgEHs). Instead I'm going to take a stab at an example of what probably _isn't_ DevOps by most reasonable standards.

DevOps is not the separation of developers into those responsible for managing infrastructure, and those writing product-centric code. It's also probably not enforcing the rule that these teams communicate (or god forbid, collaborate) through a very specific set of channels. Channels usually requiring some form-signing, box-ticking, and evidence-gathering so everyone knows where to point the finger if something blows up.

In fact, forget DevOps. Lowering communication bandwidth between the people who make the cool thing, and the people who deploy and monitor the cool thing, is probably just a headache waiting to happen.

I can see where this sort of organizational compartmentalization can come from, and I really don't like it. It evidences the desire for some members of management to have _oversight_, _rules_, and _process_. This is so that everything is _safe_. But in reality all of this is just an artefact of a lack of trust in their engineers. You know. The people that were hired specifically because they are supposed to know what they're doing.

The worst part about this kind of culture is that it doesn't actually prevent the kind of failures that motivate it. All the drip-fed communication and mental overhead of red tape can end up making smart people do dumb things. But at least we all have someone to blame when they do. 🙄

### And Relaaaax...

Anyway, after this somewhat cathartic work-based learning blog, I'm feeling ready to start the coming week with a fresh attitude. I'm still curious about the history of the aforementioned culture, so I might give my more easygoing colleagues a bit of a prod to see what I can find out about the source of both the good and the not-so-good aspects of the company.

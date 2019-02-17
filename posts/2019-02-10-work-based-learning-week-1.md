---
path: "/work-based-learning-week-1"
date: "2019-02-10"
title: "Work based learning: Week 1"
---
It feels good to be back at work. Since completing my placement as a software engineer, I have continued my studies at university. As much as the relaxed atmosphere of home working can be a welcome break after a hectic year of moving house twice, losing my motorcycle, and travelling around Europe, I always find myself itching to get back at it.

I'm currently taking a module, "Work Based Learning", where I document my experiences over 100 hours of industry placement. The idea is to show the ability to self-reflect, solve problems practically, act professionally within the law, and communicate effectively. And so, this post begins a series that should demonstrate my technical, interpersonal, and professional acumen. And if it doesn't, at least you, _the reader_, might be entertained by my attempts at writing English instead of Javascript for a change.

### What I did this week

#### Day 1
An early start preceded my arrival at work. Getting up at 5:30 to be ready and on the train by 6:40 was a bit of a mission after settling back in to the student lifestyle. Despite the two hour train and bus ride, I arrived to work on time to be greeted by the friendly member of HR occupying the reception desk.

The first day consisted mostly of formalities. To start, I had a chat with another student that is joining me in this placement while we were waiting to meet a member of HR, and we very quickly became friends. The day progressed quickly to the predictable ceremony of reading company regulations and signing forms. Next, we were taken on a tour of the building, primarily to be shown the fire exits, the bathrooms, and finally, our desks.

After our orientation, the nerve-racking moment approached: it was time to meet the team. I needn't have been so anxious. Hand shakes and smiles all round, I already felt welcome in the venue for this new adventure for the next few weeks. My fellow student and I became part of a small team dedicated to investigating the best Javascript framework to use to replace an esoterically written monolith of code that the company had reluctantly relied on for one of their products.

To get us better acquainted with the problem at hand, some of the senior developers organized a meeting in which they presented the current product; the confusing and completely bespoke implementation; and the problems therein. Unsurprisingly, the principal of which was maintainability.

We finally got down to concrete work and started creating a backlog of work items that we will complete over the coming weeks. They encompass each requirement for the frameworks we will reviewing. The company had already compiled a list of requirements for the proposed tool, so this was more of an exercise in learning to use JIRA according to the company's agreed practice.

What followed was a two and a half hour train commute home. Lovely.

#### Day 2
The next day began with resolving some technical issues with a broken display at my workstation. My team worked at the same PC in the morning, creating Angular components that would serve as the proof of concepts for the requirements of the first framework, [GoJS](https://gojs.net). By the afternoon, we had split up to cover more ground, so to speak. I am already familiar with Angular so I worked on my own, whilst my colleagues worked together in order for the more experienced, permanent engineer to assist the other student.

A lively technical conversation took place over lunch, in which I took part, which bolstered my feeling of truly being a part of the team.

In order to remedy the lengthy commute, I approached my manager about car sharing with a member of the team. He offered to ask some of my colleagues who live in my city to have me as a passenger. Soon after, he introduced me to another student who lives close to me and is on her placement year at the company. The offer of a sharing the commute was a welcome relief.

### Analysis and Learning
This week has involved meeting lots of new people, so it makes sense that the most important set of skills I've had to use this week are communication skills. In a professional environment, it is often assumed that a "stiff upper lip" and business oriented attitude are always appropriate. This is not the case. Compassion, humour, and openness are key to making connections with colleagues and customers. As an example, I knew I would be working closely with the other university student, so I made it a priority to spend the short amount of time we had free in the morning to build a rapport with him. I chose a topic that I knew we had in common (university) and made sure my tone was casual and disarming. I made sure to ask questions as much as I answered them, and listened actively to his responses. Ultimately, we had a few good laughs and by the time our next appointment was due, we were both smiling with a significantly less nervous disposition.

I've identified an opportunity for improvement as a result of a seemingly innocuous interaction I had with the member of HR whilst signing forms relating to my rights and responsibilities as a member of the workforce. It was mentioned at one point that I was not, in fact, an employee in spite of the terminology contained within some of the forms. At first I shrugged this comment off, until it was later mentioned to me by another member of HR that I had to sign a form relating to some responsibilities I had as an employee. Obviously, this was a confusing moment. I feel I should have been more assertive in getting clarification on this issue so I can be confident of my legal obligations and rights on this placement.

During the meeting in which we were caught up on the problem our team was tasked with solving, I made sure to ask plenty of questions. Understanding the genesis of a problem like this can provide valuable insights into the culture of the company, as well as the feasibility of a variety of solutions. Whilst my inquisitiveness unearthed some useful nuggets of information I will use going forward, I also can't help but feel I may have been too probing. My preconceptions of where the conversation was heading caused me to inquire over-eagerly into topics that were to be covered later. Although the material shown to us (as well as the way it was presented) was very verbose, I understand I need to be more empathetic to my colleagues in the meeting whose understanding of the problem may have not been so clear.

Conversations might be the best way of facilitating teamwork, but written communication is important too. This is especially pertinent when it comes to keeping track of work. As we were creating the backlog in JIRA and setting up the Git repository, I made sure to write short, clear backlog item descriptions. This is always important so as to avoid the all too common "I understand it, why can't you?" problem. Before starting to code I also asked if the development team used a particular workflow for Git. As it happened, Gitflow was the answer, and I was informed about the commit message conventions too.

In the process of seeking support from the IT team to fix my workstation's display, I ran into some issues. My colleague in the IT team that was helping me remotely was only able to achieve marginal success by taking control of my PC. On his end, it appeared as though the issue had been resolved, and he was confused as to why I couldn't see anything on my second screen. By this time, half an hour had been spent trying to fix a simple issue remotely, so I took the initiative to find the IT office and request in-person support. As a result of this, my hardware issue was resolved within 5 minutes so I could get back to work. I thanked the people who helped me and made sure to remember their names. I think it's important to know a variety of people from around the business so I have colleagues to contact when I need a problem solved that is out of my reach.

As we began group programming on the second day, I asked my colleagues how experienced they were in the tools we were using. Naturally, the fully employed member of the team was most experienced, so it seemed appropriate to suggest he pair programmed with the other student who had little experience in using Angular or writing Javascript. In my opinion, this kind of action shows an understanding of the needs of others which I try to be cognizant of. I think it's helpful to understand the strengths and weaknesses in myself and my colleagues, and to ensure I talk about them as a matter of fact, rather than promoting an all too common environment of shame or braggadocio in the IT sector. And yes, I'm aware of the irony of that statement contained within a blog about my personal achievements this week.

Over lunch, I had a conversation about Angular and test driven development with my colleague. He argued that in the kind of work we are undertaking, the practice of TDD can slow down the process. I understood his point; how can a developer test something they don't yet know how to use? I disagreed however, and suggested that we could prove the maintainability of a framework by its facilitation of test driven development. In effect, if a tool is too complex to test until you know it, how practical is that tool to use? Ultimately we both landed somewhere in the middle, that an engineer needs to remain continually aware and reflective of their own knowledge, such that the switch to TDD is made as soon as testing before writing code becomes pragmatic. Meanwhile, I learned a good method for organizing and composing Angular modules to keep code clean and testable.

Finally, organizing a lift share with the help of my manager was a good move for time management. It greatly reduced the length of time to get to and from work, which enables me to ensure I'm punctual. Furthermore it offers an opportunity to socialise with more members of staff so I can better understand the company culture and the individuals I work with. Another benefit of lift sharing is also that I have more time to share between my university duties. This will help prevent me from reaching burnout, which is fairly rife within the tech industry, and allow me to cope with the demanding schedule of dissertation work, meetings, work, and interviews.

### Reflection
I'm happy with the progress I've made this week. I've learned a lot about the inner workings of the company I've joined. In particular, I've noticed how quickly I've built good working relationships with a number of colleagues compared to the start of my previous placement. I have made note of the fact that I need to work on taking a step back in some conversations. As much as my confidence has served me well in one-on-one interactions, group conversations can become unproductive if not all members are given a space to seek the answers they require. I'll try to hold back and be more of an observer in the coming week, as I hope to facilitate quieter points of view that sometimes have the most important thoughts to share.

Dates in work:
* 2019-02-05
* 2019-02-06

Hours worked: 16

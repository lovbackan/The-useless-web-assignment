![](https://steamuserimages-a.akamaihd.net/ugc/837016417756088462/86E3CA96A4D29050989282A122917E64B87CA3AB/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false)

# Solar-System-Generator

During our first months studying web developement at Yrgo we were tasked to create a fun project in vanilla JS that was supposed to be totally meaningless.
I made a solar system generator, ment to hopefully inspire someone who is searching for inspiration in their creative endeavours or just entertain someone a short while!

# Deployment

[Solar System Generator](https://solarsystemgenerator.netlify.app)

# Code Review

1. `index.html:20-42` - I am unsure about this very nested structure. It kind of works because the project is so small. but I believe there is a more clear and readable way to organize this. If you were to expand the project it could quickly become very confusing.
2. `General CSS` - I would consider using kebab casing for class and id names. There are benefits to camel case but since kebab is standard in css it can get a bit confusing to mix them. 
3. `script.js:18-476 ` - When arrays get this long I would recommend putting them into a separate file. It does get a bit hard to read the file like this.
4. `script.js:486-500` - This is the same anonymous function twice. It would be better to declare the function separately. Also using the style attribute is not the best way to handle this, I would have preferred adding a class. Also it is not entirely clear why you are adding it on seventhTraj and nothing else. I can kind of guess how it works, but you could probably find a more readable solution.
5. `script.js:506` - Adding galaxyName to planetName.innerText is a bit confusing. Is planetName perhaps a legacy name? It looks like it ought to be called galaxyName.

# Testers

Tested by the following people:

1. Robin
2. Alfred

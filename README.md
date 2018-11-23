# D3 ⚙️

* [Assignment](#assignment-)
* [Final Product](#final-product-)
* [First Idea](#first-idea-)
* [Second Idea](#second-idea-)
* [Data](#data-)
* [Interaction](#interaction-%EF%B8%8F)
* [What did I learn?](#what-did-i-learn-)
* [Credits & Help](#credits--help-%EF%B8%8F)
* [Sources](#sources-)
* [To Do](#to-do-)
* [Sketches](#sketches-)

## Assignment 📚
Make a data visualization with interaction.

We had to make another data visualization with data we get from the OBA API. This time we had to add interaction to the visualization.

## Final Product 📊
https://lindadehaan.github.io/frontend-data/index.html

<img width="600" src="/images/end-product.png">

My final product is not what I wanted it to be, but I'm still proud of myself that I made this and that I understand the code.

The chart shows the percentage per language per genre. All the languages in one genre together are 100%.
You can chose to see just one language or all the languages.
The buttons are the same color as the corresponding bar. This is how you can see which bar is which language. Although the tooltip also shows what the bar represents.

## First Idea 📶
<img width="600" src="/images/wireframe-datavisualisatie.jpg">

I wanted to make a map with `D3` and on that map I wanted to place pie charts with the precentage of books with certain genres in a certain lanuage.
I chose five languages, Dutch, English, French, German and Spanish. I chose these languages, because these are the languages that you can learn or choose at school.  
I had the data from 2015 until 2018.

I also wanted the user to see information about the part of the pie charts when they would hover over it. You would see what the exact percentage was and how many books are exactly in that genre of a certain language.
And when there would be only one book, I wanted to show that exact book.

I started with making a map of Europe with `D3`. I did not want to have all the countries in Europe. I wanted to show all the areas in Europe where they speak Dutch, English, German, French or Spanish. For example in Luxembourg they speak German, French and Luxembourgs.
Finally I got the map. The map in the image above is the map I made with `D3`.

After I got the map I tried to make pie charts. I searched for a lot of tutorials and examples and tried out a lot of them. Everyday of the first week, after I got my idea, I tried to make a pie chart.  
But it just did not work.

But I had another idea, so I thought maybe I should give that a try.

## Second Idea 📶

The second idea I had was a stacked bar chart where you could click on one of the stacked bars. And when you click one bar you would get a normal bar chart where you see all the parts of the stack bar. You could choose a language and you would see a stacked bar for every year and in the stack bar the genres would have been shown.

<img width="600" src="/images/schetsstacked.jpg">

I had trouble with understanding how I must use the data I got. So in the beginning I could not make the stacked bar chart work. I struggled with that a lot, so I decided I have to reduce the data I got. So I got rid of the idea that I should show the years, but I still got the data from the year 2015 until 2018.
I still tried to make a stacked bar chart with the reduced data. I thought I was succeeding, but this wasn't the case. I had the right axis but the stacks did not work and one of the genres was grouped.

<img width="600" src="/images/stackedchart.png">

After this did not work out, I searched for an example for a grouped bar chart. I thought maybe that would be a bit easier to understand. And all the examples I found were indeed easier to understand, so I tried to make a grouped bar chart. In the beginning it would not really work, but after I asked help a couple of time from Wouter, Maikel, Chelsea and Jessie I eventually got a grouped bar chart (on the last day).

<img width="600" src="/images/end-product.png">

It was certainly not the idea I had in mind, but I'm still happy with the result. And I'm happy because I learned a lot about `D3` and I truly have the feeling I understand it pretty well.

In the chart I eventually made you see all the genres on the x axis and the percentage of books on the y axis.  
Each of the bars represent a language for each genre. They show the percentage of the amount of books in a certain language per genre.
You can change if you want to see all the languages or if you want to see one of the languages.

## Data 💾
For the data I chose five languages I wanted to get from the API and six genres from the year 2015 until 2018.
I tried to get 1000 result for every genre. At first it crashed every time, because everyone in the course was getting data from the API.  
I tried to get all the data when I was home and it worked.

I got the feedback that I should get the data from earlier years, and I wanted to do that but I first wanted to get a working chart. I did this because I knew I was going to have trouble with the chart and I already had data. Eventually I did not have the time to get data from earlier years, because I got stuck with all the charts.

The data I got from the API:
* The languages Dutch, English, German, French and Spanish;
* Publication years from 2015 until 2018;
* The genres Detective, Humor, Sciencefiction, Stripverhaal, Avontureroman and Romantisch verhaal;
* Publication place, because I had a little idea to show this when you would hover on a genre with a few books.

### Data Structure
```js
[
{
"genre": "Detective",
"language": "dut",
"percentage": 57.9
},
{
"genre": "Detective",
"language": "eng",
"percentage": 35.8
},
```

## Interaction ⁉️
I got very few interactions, but I had such a struggle with getting a chart. I am happy with what I've got.

The interactions I've got are:
* Switching the language you can see;
* Hover over the bars and get a tooltip with the language, genre and the exact percentage of that bar.

## What did I learn? 🤔
Getting the data I needed wasn't a problem, because I had done this before now (in the last course). So that was something that I got pretty quick.  

I really learned a lot about `D3`. Although did not use `d3.nest()` in my final product, I did use it to make the other bar and pie charts. I learned how useful it is to give you data a different structure, so you can use it how you want to use it.

I learned that `D3` is a lot of math, that is what makes it logical. And I understand math pretty well, that is why I understand `D3` more than I understand `JavaScript`.

You can make so many different visualizations with the same data with `D3`. I just could not make it work, because I did not understand how to use my data at first. But eventually I understood it, luckily!

There are so many people who can and will help you. Even if it is the most stupid thing that you just did not see. Everyone has a struggle with code at some point. I learned that I should not be afraid to ask for help.

## Credits & Help ❤️
* [Jessie Mason](https://github.com/jessiemasonx)
* [Chelsea Doeleman](https://github.com/chelseadoeleman)
* [Maikel van Veen](https://github.com/Maikxx)
* [Wouter Lem](https://github.com/maanlamp)
* [Guus Dijkhuis](https://github.com/GuusDijkhuis)

I got a lot of help from other students. They helped to understand the code and helped me understand how I should use the code.

Jessie helped me a lot with all the errors I got and also with a lot of code about `d3.nest()`.

Wouter and Maikel especially helped me with understanding my code and understanding how to use it.

Chelsea explained a lot of code to me. She is really good at explaining code I just do not understand fully.

Guus helped me with the transition of the bars. He gave one tip and after that it immediately worked.

## Sources 🖥
* [Grouped bar chart](https://bl.ocks.org/syncopika/f1c9036b0deb058454f825238a95b6be)
* [Tooltip](https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7)
* [Map with `D3`](http://blockbuilder.org/bricedev/b485239a37ca57722603)
* [Removing countries from map](https://github.com/d3/d3/blob/master/CHANGES.md)
* [Learn JS data](http://learnjsdata.com/group_data.html)

## To Do 🤓
- [x] Get an idea to visualize data from the OBA
- [x] Get the data I need from the API from the OBA
- [x] Make a map of Europe with `D3`
- [x] Remove the countries I do not need
- [x] Search for tutorials and examples of a pie chart with `D3`
- [ ] Make a pie chart with my own data
- [x] Search for tutorials and examples of a stacked bar chart with `D3`
- [ ] Make a stacked bar chart with my own data
- [x] Search for tutorials and examples of a grouped bar chart with `D3`
- [x] Make a grouped bar chart with my own data
- [x] Add interaction
  - [x] Tooltip
  - [x] Switch languages
- [x] Add transitions to the bars when users switch to other data
- [ ] Put data in seperate `json` file
- [x] Add a legend
- [ ] Add transition to y axis
- [x] Make buttons of the languages for users to click
- [x] Style chart
- [ ] Add years to chart to make more interaction possible
- [ ] Get data from earlier years

I did not have time for everything, and I can not do everything by myself. But this is what I wanted to achieve.

## Sketches ✏️
<img width="600" src="/images/schetsstacked.jpg">

<img width="600" src="/images/map.jpg">

<img width="600" src="/images/sunburst.jpg">

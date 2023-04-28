# OOO to checkin/out report
Google App Script to generate a email report of your working times using only OOO events

### Setup

1. Go to https://script.google.com/home 

2. Create a new project

3. Copy the source/ files at the new project

4. Setup Services:
- Gmail v1
- Google Calendar v3

5. Put your email at Code.gs#EMAIL

6. RUN!

### Use case

I’m always registering OOO events on calendar when I’m not working or when I go to sleep, etc. Since I can’t predict at a 100% when I will wake up etc, I normally modify the end of OOO events when I start working again.

So, my google calendar looks like this:

<img src="https://i.imgur.com/h3qg91K.png" alt="Google Calendar OOO events" width="100%"/>

### What this scipt does

Since I have all my working hours registered this way, I created a script to generate a Checkin/Checkout report and calculate the worked hours. Of course this could have some error margins, but I think is useful!

Also, since I work with chaotic hours, I can track if my total week hours makes sense. :slightly_smiling_face:

So I receive an automated email like this: 

<img src="https://i.imgur.com/Rforgsk.png" alt="Google Calendar OOO events" />

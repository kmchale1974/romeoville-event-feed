// fetch-events.js
const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser({
  headers: { 'User-Agent': 'romeoville-events-fetcher' }
});

(async () => {
  const feedUrl = 'https://www.romeoville.org/RSSFeed.aspx?ModID=58&CID=All-calendar.xml';
  const feed = await parser.parseURL(feedUrl);

  const events = feed.items.map(item => {
    const summary = item.summary || "";
    const dateMatch = summary.match(/Event date[s]?: (.*?)<br>/i);
    const timeMatch = summary.match(/Event Time: (.*?)<br>/i);
    const locationMatch = summary.match(/Location:.*?<br>(.*?)<br>/i);

    return {
      title: item.title,
      date: dateMatch ? dateMatch[1].trim() : 'Date TBD',
      time: timeMatch ? timeMatch[1].trim() : 'Time TBD',
      location: locationMatch ? locationMatch[1].replace(/Romeoville, IL.*/, '').trim() : 'TBD',
      link: item.link
    };
  });

  fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
})();

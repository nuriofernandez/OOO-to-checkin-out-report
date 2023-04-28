function getEventsOf(week, year) {
  const response = [];

  var calendarId = EMAIL; // Replace with your calendar ID

  var startOfWeek = getMondayOfWeek(week, year);
  var endOfWeek = getFridayOfWeek(week, year);

  var timeMin = startOfWeek.toISOString(); // convert to ISO format
  var timeMax = endOfWeek.toISOString(); // convert to ISO format

  var events = Calendar.Events.list(calendarId, {
    timeMin: timeMin,
    timeMax: timeMax,
    orderBy: 'startTime',
    singleEvents: true
  }).items;

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    if (!(event.summary.toLowerCase().indexOf('out of office') !== -1)) {
      continue;
    }

    response.push(event)
  }

  return response
}

function getMondayOfWeek(week, year) {
  const date = new Date(year, 0, 1);
  const day = date.getDay();
  const diff = (day <= 4) ? 1 - day : 8 - day;
  date.setDate(1 + (week - 1) * 7 + diff);
  return date;
}

function getFridayOfWeek(week, year) {
  const date = new Date(year, 0, 1);
  const day = date.getDay();
  const diff = (day <= 4) ? 5 - day : 12 - day;
  date.setDate(1 + (week - 1) * 7 + diff);
  date.setHours(23, 59, 0, 0);
  return date;
}

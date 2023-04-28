const EMAIL = "YOUR_EMAIL_OR_CALENDAR_ID"

function main() {
  const weekNumber = 17; // Swedish week counting > all
  const yearNumber = 2023;

  const oooEvents = getEventsOf(weekNumber, yearNumber);

  const registryActions = convertToRegistryActions(oooEvents)

  sendEmail(`${weekNumber}-${yearNumber}`, registryActions);
}

function convertToRegistryActions(events) {
  let registryActions = [];

  for (let i = 0; i < events.length; i++) {
    let event = events[i];

    registryActions.push({ time: event.start, action: 'checkout' });
    registryActions.push({ time: event.end, action: 'checkin' });
  }

  return registryActions;
}

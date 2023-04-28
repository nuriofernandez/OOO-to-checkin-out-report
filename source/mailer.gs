function sendEmail(title, registryActions) {
  const html = generateRegistryTable(registryActions);
  MailApp.sendEmail(
    EMAIL,
    `${title} > Checking/Checkout report`,
    "",
    {htmlBody: html} 
  );
}


function generateRegistryTable(registryActions) {
  let tableHtml = '<table><tr><th>Time</th><th>Action</th></tr>';

  for (let i = 0; i < registryActions.length; i++) {
    let action = registryActions[i];

    let timedate = new Date(Date.parse(action.time.dateTime))

    // For human communication, ignore the first and last values if they are at midnight
    if (i == 0 || i == (registryActions.length - 1)) {
      if (timedate.getUTCHours() == "22") { // "22 UTC" == "24 CEST" This may need a change on CET
        continue
      }
    }

    let timeString = timedate.toISOString().slice(0, 16).replace('T', ' ') + " UTC"// Convert Date to string
    let actionString = (action.action === 'checkin') ? 'Check In' : 'Check Out';

    tableHtml += '<tr><td>' + timeString + '</td><td>' + actionString + '</td></tr>';
  }

  tableHtml += '</table>';

  tableHtml += "<br>";

  const totalCheckinTimeMs = calculateTotalCheckinTime(registryActions);
  let totalCheckinTimeHrs = totalCheckinTimeMs / (1000 * 60 * 60);
  tableHtml += "Total time: "+totalCheckinTimeHrs.toFixed(2)+ " hours";

  return tableHtml;
}

function calculateTotalCheckinTime(registryActions) {
  let totalCheckinTime = 0;
  let lastCheckinTime = null;

  for (let i = 0; i < registryActions.length; i++) {
    let action = registryActions[i];
    let timedate = new Date(Date.parse(action.time.dateTime))

    if (action.action === 'checkin') {
      lastCheckinTime = timedate;
    } else if (action.action === 'checkout') {
      if (lastCheckinTime) {
        let checkinTimeMs = lastCheckinTime.getTime();
        let checkoutTimeMs = timedate.getTime();

        totalCheckinTime += (checkoutTimeMs - checkinTimeMs);
        lastCheckinTime = null;
      }
    }
  }

  return totalCheckinTime;
}

const teamName = document.querySelector('h1.component__title').textContent;
const sections = document.querySelectorAll('section');

let targetSection;

sections.forEach(section => {
  const headerSpan = section.querySelector('h2.component__title span');
  if (headerSpan && headerSpan.textContent.includes('Utkání')) {
    targetSection = section;
  }
});

if (targetSection) {
    const rows = targetSection.querySelectorAll('table.component__table tbody tr');
    const rowDataArray = [];

    rows.forEach(row => {
        const columns = row.querySelectorAll('td');
        if(columns.length > 0) {

            const inputDate = columns[0].textContent;
            const inputTime = columns[1].textContent;
            
            // Rozdělení datového řetězce na den, měsíc a rok
            const dateParts = inputDate.substring(3).split('.');
            const day = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]);
            const year = 2000 + parseInt(dateParts[2]);

            // Rozdělení časového řetězce na hodiny a minuty
            const timeParts = inputTime.split(':');
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);

            // Vytvoření objektu Date pro zadané datum a čas
            const eventDate = new Date(year, month - 1, day, hours, minutes);
            const eventDateFinished = new Date(year, month - 1, day, hours + 1, minutes);

            // Převod data na formát pro URL (bez timezone)
            const formattedDate = eventDate.toISOString().replace(/-|:|\.\d+/g, "");
            const formattedDateFinished = eventDateFinished.toISOString().replace(/-|:|\.\d+/g, "");
            const where = columns[2].textContent;
            const whereLink = 'https://www.psmf.cz' + columns[2].querySelector('a').getAttribute('href');
            const teams = columns[3].querySelectorAll('a:not(.component__table-shirt)')
            const shirts = columns[3].querySelectorAll('a.component__table-shirt')
            
            const home = teams[0].textContent;
            const homeShirt = shirts[0].getAttribute('title');
            const away = teams[1].textContent;
            // const awayShirt = shirts[1].getAttribute('title');
            const round = columns[4].textContent;

            // Název a popis události (můžete upravit dle potřeby)
            const eventName = `${round} zápas ${home} vs ${away} [${where}]`;
            
            const eventDescription = home === teamName
                ? `Ve ${inputDate} od ${inputTime} hrajeme proti ${away} na hřišti ${where} (${whereLink}). Jakožto domácí budeme hrát v našich dresech`
                : `Ve ${inputDate} od ${inputTime} hrajeme proti ${home} na hřišti ${where} (${whereLink}). Jakožto hosté se budeme muset přizpůsobit dresům soupeře, který bude hrát v barvách ${homeShirt}`;

            // Vytvoření odkazu na vytvoření události v Google Kalendáři
            const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&details=${encodeURIComponent(eventDescription)}&dates=${formattedDate}/${formattedDateFinished}&ctz=UTC`;

            // Vytvoreni tlacitka pro vytvoreni udalosti v Google Kalendari
            const button = document.createElement('a');
            button.setAttribute('href', googleCalendarLink);
            button.setAttribute('target', '_blank');
            button.innerText = 'Přidat do kalendáře';

            columns[0].insertAdjacentElement("beforeend", button)
        }
    });
}



import { loadFragment } from "../fragment/fragment.js";

export default async function decorate(block) {
    // get metadata property from page by name
    const origin = document.querySelector('meta[name="origin"]').content;
    const destination = document.querySelector('meta[name="destination"]').content;


    const destinations = await fetch('/en-gb/destinations/default/destinations.json')
        .then((response) => response.json())
        .then((data) => data.data);
    

    console.log(origin.content)
    // find first item in destination with attribute matching origin
    const destInfo = destinations.find(item => (item.Destination === destination));
    
    block.textContent = '';
    
    const dest = await loadFragment(destInfo.DestinationURL);
    const destSection = document.createElement('section');
    while (dest.firstElementChild) destSection.append(dest.firstElementChild);

    const orig = await loadFragment(destInfo.OriginURL);
    const origSection = document.createElement('section');
    while (orig.firstElementChild) origSection.append(orig.firstElementChild);
  
    block.append(destSection);
    block.append(origSection);
}
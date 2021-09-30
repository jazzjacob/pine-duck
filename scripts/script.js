const linksList = document.querySelector('.links-nav ul');
const links = document.querySelectorAll('.links-nav a');
console.dir(links);

linksList.addEventListener('mouseover', event => {
  console.dir(event.target.localName);
  const typeOfTargetElement = event.target.localName;
  const targetElement = event.target;
  if (typeOfTargetElement === "a") {
    console.log('yes');
    event.target.classList.add('links-hover-box');
  }
})

linksList.addEventListener('mouseout', event => {
  const targetElement = event.target;
  const typeOfTargetElement = event.target.localName;
  if (typeOfTargetElement === "a") {
    event.target.classList.remove('links-hover-box');
  }
})



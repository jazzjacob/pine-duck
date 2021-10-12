const linksList = document.querySelector('.links-nav ul');
const links = document.querySelectorAll('.links-nav a');

linksList.addEventListener('mouseover', event => {
  const typeOfTargetElement = event.target.localName;
  const targetElement = event.target;
  if (typeOfTargetElement === "a") {
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



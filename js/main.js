console.log('ready...');


var theme = window.location.search.substring(1);

if (theme === 'theme=light') {
  document.querySelectorAll('link')[1].href= 'css/main-light.css';
  console.log('Recitac Light Theme is active...');
} else {
  document.querySelectorAll('link')[1].href= 'css/main-dark.css';
  console.log('Recitac Dark Theme is active...');
}
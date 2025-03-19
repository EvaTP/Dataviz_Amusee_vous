const select = document.querySelector('#recherche-region');

select.addEventListener('change', function() {
  const url = this.options[this.selectedIndex].dataset.url;
  if (url) {
    window.location.href = url;
  }
});
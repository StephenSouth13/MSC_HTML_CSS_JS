document.querySelectorAll('.tab-box').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab-box').forEach(t => t.classList.remove('active'));
    // Add 'active' class to clicked tab
    tab.classList.add('active');

    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(panel => panel.style.display = 'none');
    
    // Show the panel with the matching data-tab
    const selected = tab.getAttribute('data-tab');
    document.getElementById(selected).style.display = 'block';
  });
});
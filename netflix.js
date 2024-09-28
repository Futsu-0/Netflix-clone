window.addEventListener("scroll", function() {
    const topDashboard = document.querySelector('.top-dashboard');
    
    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate the opacity based on scroll. You can adjust '300' for fading speed.
    const maxScroll = 300; // Scroll distance at which the element will disappear
    const opacity = Math.max(1 - scrollTop / maxScroll, 0);
    
    // Apply the calculated opacity to the top-dashboard
    topDashboard.style.opacity = opacity;
});


document.getElementById('menuButton').addEventListener('click', function(){
   const menuContainer = document.getElementById('menuContainer');
   
 if(menuContainer.innerHTML.trim()=== ""){
      fetch('Menu.html')
      .then(response => response.text())
      .then(data => {
        menuContainer.innerHTML = data;
        menuContainer.style.display= 'block';
        document.body.style.overflow = 'hidden'
      })
      
 }
      
    else{
      menuContainer.style.display = menuContainer.style.display === 'block' ? 'none' : 'block';
      if (menuContainer.style.display === 'block') {
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
        } else {
            document.body.style.overflow = ''; // Allow body scrolling
    }
    }
});


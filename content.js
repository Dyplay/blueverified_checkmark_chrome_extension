const profileId = window.location.pathname.split('/')[2];

chrome.storage.sync.get([profileId], function(data) {
  if (data[profileId]) {
    // Your existing code to remove the element and add the verified badge
    function modifyPage() {
        // Step 1: Remove all elements with the class 'premium-badge-right-aligned'
        const elementsToRemove = document.querySelectorAll('.premium-badge-right-aligned');
        
        elementsToRemove.forEach(element => {
            element.remove(); // This removes the element from the DOM
            console.log('Removed element with class "premium-badge-right-aligned".');
        });

        // Step 2: Insert the verified badge in the header-title element
        const headerTitle = document.querySelector('.header-title');
        
        if (headerTitle) {
            console.log('header-title element found:', headerTitle);

            // Create the span element
            const spanElement = document.createElement('span');
            spanElement.setAttribute('role', 'button');
            spanElement.setAttribute('tabindex', '0');
            spanElement.setAttribute('data-rblx-verified-badge-icon', '');
            spanElement.setAttribute('data-rblx-badge-icon', 'true');
            spanElement.className = 'jss64';

            // Create the img element
            const imgElement = document.createElement('img');
            imgElement.className = 'profile-verified-badge-icon';
            imgElement.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'%3E%3Cg clip-path='url(%23clip0_8_46)'%3E%3Crect x='5.88818' width='22.89' height='22.89' transform='rotate(15 5.88818 0)' fill='%230066FF'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.543 8.7508L20.549 8.7568C21.15 9.3578 21.15 10.3318 20.549 10.9328L11.817 19.6648L7.45 15.2968C6.85 14.6958 6.85 13.7218 7.45 13.1218L7.457 13.1148C8.058 12.5138 9.031 12.5138 9.633 13.1148L11.817 15.2998L18.367 8.7508C18.968 8.1498 19.942 8.1498 20.543 8.7508Z' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_8_46'%3E%3Crect width='28' height='28' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E";
            imgElement.title = "20349956";
            imgElement.alt = "20349956";

            // Append the img element to the span element
            spanElement.appendChild(imgElement);

            // Append the span element to the header-title element
            headerTitle.appendChild(spanElement);

            console.log('Verified badge inserted.');
        } else {
            console.log('Element with class "header-title" not found.');
        }
    }

    // Run the function after the page is fully loaded
    window.addEventListener('load', function() {
        // Adding a small delay to ensure all dynamic content is loaded
        setTimeout(modifyPage, 150);
    });
  }
});
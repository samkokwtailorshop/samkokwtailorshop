window.addEventListener('DOMContentLoaded', event => {

    // Function to toggle the description for services
    const serviceItems = document.querySelectorAll('.list-group-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const description = this.querySelector('.description');
            if (description) {
                description.style.display = description.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Handle review text expansion
    document.querySelectorAll('.review-text').forEach(function(review) {
        review.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });

    // Dynamically add images to the main carousel
    const images = [
        'assets/img/1.jpg',
        'assets/img/2.jpg',
        'assets/img/3.jpg',
        'assets/img/4.jpg',
        'assets/img/5.jpg',
        'assets/img/6.jpg',
        'assets/img/7.jpg',
        'assets/img/8.jpg',
        'assets/img/9.jpg',
        'assets/img/10.jpg',
        'assets/img/11.jpg',
        'assets/img/12.jpg',
        'assets/img/13.jpg',
        'assets/img/14.jpg',
        'assets/img/15.jpg',
        'assets/img/16.jpg',
        'assets/img/17.jpg',
        'assets/img/18.jpg',
        'assets/img/19.jpg',
        'assets/img/20.jpg',
        'assets/img/21.jpg',
        'assets/img/22.jpg',


    ];

    const carouselInner = document.querySelector('.carousel-images');

    if (carouselInner) {
        images.forEach((imageSrc, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const img = document.createElement('img');
            img.src = imageSrc;
            img.classList.add('d-block', 'w-100');
            img.alt = `Gallery image ${index + 1}`;

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        });
    }

    // Dynamically add images to the About Us carousel
    const aboutUsImages = [
        'assets/img/aboutus1.jpg',
        'assets/img/aboutus2.jpg',
        'assets/img/aboutus3.jpg',
        'assets/img/aboutus4.jpg',
        'assets/img/aboutus5.jpg',
    ];

    const aboutUsCarouselInner = document.querySelector('.about-us-carousel-images');

    if (aboutUsCarouselInner) {
        aboutUsImages.forEach((imageSrc, index) => {
            const aboutUsCarouselItem = document.createElement('div');
            aboutUsCarouselItem.classList.add('carousel-item');
            if (index === 0) {
                aboutUsCarouselItem.classList.add('active');
            }

            const aboutUsImg = document.createElement('img');
            aboutUsImg.src = imageSrc;
            aboutUsImg.classList.add('d-block', 'w-100');
            aboutUsImg.alt = `About Us Gallery image ${index + 1}`;

            aboutUsCarouselItem.appendChild(aboutUsImg);
            aboutUsCarouselInner.appendChild(aboutUsCarouselItem);
        });
    }

    // Handle navbar collapse
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    document.addEventListener('click', function (event) {
        if (navbarCollapse.classList.contains('show') && !navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
    (function() {
        emailjs.init("XT5ZRKvMkfyNcd9sv");  // Your public API key
    })();
    
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent page reload
    
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const statusElement = document.getElementById('status');
    
        if (!name || !phone || !email || !message) {
            statusElement.innerHTML = "All fields are required.";
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            statusElement.innerHTML = "Please enter a valid email address.";
            return;
        }
    
        // Send the form data to your service
        emailjs.send("service_e2qkmkl", "template_mvwa2yg", {
            from_name: name,
            phone: phone,
            email_id: email,
            message: message,
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            statusElement.innerHTML = "Message sent successfully!";
    
            // Send acknowledgment email to the user
            emailjs.send("service_e2qkmkl", "template_pahi0pf", {
                to_email: email,
                from_name: name,
            })
            .then(function(response) {
                console.log('Acknowledgment email sent successfully!', response.status, response.text);
                // Clear the form fields
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.log('Failed to send acknowledgment email...', error);
                statusElement.innerHTML = "Failed to send acknowledgment email!";
            });
        }, function(error) {
            console.log('FAILED...', error);
            statusElement.innerHTML = "Failed to send message!";
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var marketingContainer = document.querySelector(".marketing-container");

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.2 });

    observer.observe(marketingContainer);
});
// Get all package options
const packageOptions = document.querySelectorAll('.package-option');

// Add click event listener to each package option
packageOptions.forEach(option => {
    option.addEventListener('click', function() {

        packageOptions.forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        const radioBtn = this.querySelector('input[type="radio"]');
        radioBtn.checked = true;
        radioBtn.parentNode.classList.add('checked');
        const selectedPackage = radioBtn.value;
        console.log('Selected Package:', selectedPackage);
    });
});





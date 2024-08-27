const form = document.getElementById('resetPasswordFrom');

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const obj = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch('/api/session/restartPassword', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Password restored successfully',
                showConfirmButton: false,
            })
            setTimeout(function () {
                window.location.replace('/');
            }, 1300);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email or password',
            })
            setTimeout(function () {
                window.location.replace('/');
            }, 1300);
            
            const responseData = await response.json();
            console.error(responseData.error);
        }
    } catch (error) {
        console.error(error);
    }
});


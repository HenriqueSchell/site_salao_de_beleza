const btnpassword = document.getElementById('btn-password')
const passwordfield = document.getElementById('password-field')

btnpassword.addEventListener('click', () => {
   const type = passwordfield.getAttribute('type') === 'password' ? 'text' : 'password'
   passwordfield.setAttribute('type', type)
})



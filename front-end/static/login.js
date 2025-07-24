//Resgatar os elementos
const btnpassword = document.getElementById('btn-password')
const passwordField = document.getElementById('password-field')
const loginBtn = document.getElementById('loginBtn')
const emailField = document.getElementById('email')
const errorEmail = document.getElementById('errorEmail')
const errorPassword = document.getElementById('errorPassword')
const errorPasswordSize = document.getElementById('errorPasswordSize')

btnpassword.addEventListener('click', () => {
   //Funcionalidade do botão mostrar e esconder senha
   const inputType = passwordField.getAttribute('type')
   if(inputType === 'password'){
      passwordField.setAttribute('type', 'text')
   }else{
      passwordField.setAttribute('type', 'password')
   }
})

loginBtn.addEventListener('click', async(e) =>{
   //Impedir que a página recarregue
   e.preventDefault()

   //Validações do campo e-mail
   const email = emailField.value
   
   if(!email.includes('@')){
      errorEmail.classList.remove('hidden')
      emailField.classList.add('bg-red-200')
      emailField.classList.remove('focus:ring-[#C9B9B0]')
      emailField.classList.add('focus:ring-red-600')
   }else{
      errorEmail.classList.add('hidden')
      errorEmail.classList.remove('block')
      emailField.classList.remove('bg-red-200')
      emailField.classList.add('focus:ring-[#C9B9B0]')
      emailField.classList.remove('focus:ring-red-600')
   }

   //Validações do campo senha
   const password = passwordField.value
   
   if(!password){
      errorPassword.classList.remove('hidden')
      passwordField.classList.add('bg-red-200')
      passwordField.classList.remove('focus:ring-[#C9B9B0]')
      passwordField.classList.add('focus:ring-red-600')
   }else{
      errorPassword.classList.add('hidden')
      passwordField.classList.remove('bg-red-200')
      passwordField.classList.add('focus:ring-[#C9B9B0]')
      passwordField.classList.remove('focus:ring-red-600')
   }

   if(password.length < 5){
      errorPasswordSize.classList.remove('hidden')
   }


})





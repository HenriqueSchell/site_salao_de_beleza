//Resgatar os elementos relacionados ao login
const btnpassword = document.getElementById('btn-password')
const passwordField = document.getElementById('password-field')
const loginBtn = document.getElementById('loginBtn')
const emailField = document.getElementById('email')
const errorEmail = document.getElementById('errorEmail')
const errorPassword = document.getElementById('errorPassword')
const errorPasswordSize = document.getElementById('errorPasswordSize')


//Resgatar os elementos relacionados ao cadastro
const register = document.getElementById('register')
const registerBtn = document.getElementById('registerBtn')
const title = document.getElementById('title')
const registerWindow = document.getElementById('registerWindow')
const loginWindow = document.getElementById('loginWindow')
const nameRegister = document.getElementById('nameRegister')
const emailRegister = document.getElementById('emailRegister')
const btnPasswordRegister = document.getElementById('btnPasswordRegister')
const btnPasswordConfirmRegister = document.getElementById('btnPasswordConfirmRegister')
const passwordRegister = document.getElementById('passwordRegister')
const confirmPasswordRegister = document.getElementById('confirmPasswordRegister')
const nameError = document.getElementById('nameError')
const emailError = document.getElementById('emailError')
const passwordError = document.getElementById('passwordError')
const confirmPasswordError = document.getElementById('confirmPasswordError')
const backToLoginBtn = document.getElementById('backToLoginBtn')


//Funções de login
btnpassword.addEventListener('click', () => {
   //Funcionalidade do botão mostrar e esconder senha
   const inputType = passwordField.getAttribute('type')
   passwordField.setAttribute('type', inputType === 'password' ? 'text' : 'password')
})

loginBtn.addEventListener('click', async (e) => {
   e.preventDefault()

   const email = emailField.value.trim()
   const password = passwordField.value.trim()

   let valid = true

   // Validação e-mail
   if (!email.includes('@')) {
      errorEmail.classList.remove('hidden')
      emailField.classList.add('bg-red-200', 'focus:ring-red-600')
      emailField.classList.remove('focus:ring-[#C9B9B0]')
      valid = false
   } else {
      errorEmail.classList.add('hidden')
      emailField.classList.remove('bg-red-200', 'focus:ring-red-600')
      emailField.classList.add('focus:ring-[#C9B9B0]')
   }

   // Validação senha
   if (!password) {
      errorPassword.classList.remove('hidden')
      passwordField.classList.add('bg-red-200', 'focus:ring-red-600')
      passwordField.classList.remove('focus:ring-[#C9B9B0]')
      valid = false
   } else {
      errorPassword.classList.add('hidden')
      passwordField.classList.remove('bg-red-200', 'focus:ring-red-600')
      passwordField.classList.add('focus:ring-[#C9B9B0]')
   }

   if (password.length < 5) {
      errorPasswordSize.classList.remove('hidden')
      valid = false
   } else {
      errorPasswordSize.classList.add('hidden')
   }

   // Verifica se passou nas validações
   if (!valid) return

   // Envia dados para o backend
   try {
      const response = await fetch("http://localhost:3000/auth/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
         localStorage.setItem('token', data.token)
         window.location.href = '/front-end/pages/home.html'
      } else {
         alert(data.msg || 'Erro ao efetuar o login!')
      }

   } catch (error) {
      console.error("Erro na requisição:", error)
      alert("Erro de conexão com o servidor.")
   }
})

//Funções de cadastro
register.addEventListener('click', () => {
   //Trocar o título de login para cadastro
   title.innerHTML = 'Vamos começar pelo seu Cadastro!'

   //Trocar a janela de login pela de cadastro
   loginWindow.classList.add('hidden')
   registerWindow.classList.remove('hidden')
})

registerBtn.addEventListener('click', async(e) => {
   e.preventDefault()

   //Receber os dados
   let name = nameRegister.value.toLowerCase().trim()
   let email = emailRegister.value.toLowerCase().trim()
   let password = passwordRegister.value.toLowerCase().trim()
   let confirmPassword = confirmPasswordRegister.value.toLowerCase().trim() 
   
   //Validar os dados
   if(name.length < 5){
      nameError.innerHTML = 'Erro! o nome deve ter no mínimo 5 caractéres'
      nameError.classList.add('text-red-500', 'py-2', 'text-sm')
      nameRegister.classList.add('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }else{
      nameError.classList.remove('text-red-500', 'py-2', 'text-sm', 'text-center')
      nameError.classList.add('hidden')
      nameRegister.classList.remove('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }

   if(!email.includes('@')){
      emailError.innerHTML = 'Erro! o E-mail precisa conter o @'
      emailError.classList.add('text-sm', 'text-red-500', 'py-2')
      emailRegister.classList.add('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }else{
      emailError.classList.add('hidden')
      emailRegister.classList.remove('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }

   if(password.length < 5){
      passwordError.innerHTML = 'A senha deve conter no mínimo 5 caractéres'
      passwordError.classList.add('text-sm', 'text-red-500', 'py-2')
      passwordRegister.classList.add('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }else{
      passwordError.classList.add('hidden')
      passwordRegister.classList.remove('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }

   if(confirmPassword !== password){
      confirmPasswordError.innerHTML = 'Erro! as senhas devem ser iguais'
      confirmPasswordError.classList.add('text-sm', 'text-red-500', 'py-2')
      confirmPasswordRegister.classList.add('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }else{
      confirmPasswordError.classList.add('hidden')
      confirmPasswordRegister.classList.remove('focus:ring-red-500', 'ring-red-500', 'bg-red-200')
   }

   // Envia dados para o backend
   try {
      const response = await fetch("http://localhost:3000/auth/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ name, email, password, confirmPassword })
      })

      const data = await response.json()

      if (response.ok) {
         localStorage.setItem('token', data.token)
         window.location.href = '/front-end/pages/home.html'
      } else {
         alert(data.msg || 'Erro ao efetuar o cadastro!')
      }

   } catch (error) {
      console.error("Erro na requisição:", error)
      alert("Erro de conexão com o servidor.")
   }
})

//Funcionalidade do botão ver e esconder senha
btnPasswordRegister.addEventListener('click', () => {
   const inputType = passwordRegister.getAttribute('type')
   passwordRegister.setAttribute('type', inputType === 'password' ? 'text' : 'password')
})

//Funcionalidade do botão ver e esconder confirmação de senha
btnPasswordConfirmRegister.addEventListener('click', () => {
   const inputType = confirmPasswordRegister.getAttribute('type')
   confirmPasswordRegister.setAttribute('type', inputType === 'password' ? 'text' : 'password')
})

//Funcionalidade do botão voltar para o login
backToLoginBtn.addEventListener('click', () => {
   window.location = 'index.html'
})



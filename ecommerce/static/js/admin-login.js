function togglePassword(){

const pass=document.getElementById("password");
const eye=document.getElementById("eyeIcon");

if(pass.type==="password"){

pass.type="text";
eye.className="bi bi-eye-slash";

}else{

pass.type="password";
eye.className="bi bi-eye";

}

}
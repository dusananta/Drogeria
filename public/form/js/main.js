// Validation code for inputs

var email=document.forms['form']['email'];
var lozinka=document.forms['form']['lozinka'];

var email_Error=document.getElementById('email_Error');
var password_Error=document.getElementById('password_Error');

email.addEventListener('textInput',email_Verify);
lozinka.addEventListener('textInput',password_Verify);

function Validation() {
	if (email.value.length <10) {
		email.style.border="1px solid red";
		email_Error.style.display='block';
		email.focus();
		return false;
	}
	if (lozinka.value.length < 8) {
		lozinka.style.border="1px solid red";
		password_Error.style.display='block';
		lozinka.focus();
		return false;
	}
}
function email_Verify(){
	var mail = "dusan.anta";
	if (email.value.length >=9)
	 {

		email.style.border="1px solid silver";
		email_Error.style.display='none';
		return true;
	}
		}

	function password_Verify(){
	if (lozinka.value.length >= 7) {

		lozinka.style.border="1px solid silver";
		password_Error.style.display='none';
		return true;
	}
}
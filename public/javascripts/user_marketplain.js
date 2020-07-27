
document.getElementById('button1').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});
document.getElementById('button2').addEventListener("click", function() {
	window.location.replace('http://localhost:3000/user_login');
});


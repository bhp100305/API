function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.error){
            alert(data.error);
            return;
        }

        // ✅ LƯU THÔNG TIN
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("role", data.role);
        localStorage.setItem("fullname", data.fullname);

        // ✅ QUAN TRỌNG NHẤT
        if(data.role === "teacher"){
            localStorage.setItem("teacher_id", data.id);
        }

        // 👉 chuyển trang
        if(data.role === "teacher"){
            location.href = "teacher.html";
        } else if(data.role === "admin"){
            location.href = "admin.html";
        } else {
            location.href = "student.html";
        }
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi login!");
    });
}
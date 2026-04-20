// ===== API =====
const API = "http://localhost:5000";

// ===== LOAD CLASS (CHỈ LỚP GIẢNG VIÊN) =====
function loadClass(){
    let teacher_id = localStorage.getItem("teacher_id");

    if(!teacher_id){
        alert("Chưa đăng nhập!");
        location.href = "login.html";
        return;
    }

    fetch(`${API}/api/teacher/${teacher_id}/classes`)
    .then(res => res.json())
    .then(data => {
        let html = "<option value=''>-- Chọn lớp --</option>";

        data.forEach(c => {
            html += `<option value="${c.id}">${c.name}</option>`;
        });

        document.getElementById("class_id").innerHTML = html;
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi load lớp!");
    });
}

// ===== LOAD SUBJECT THEO LỚP =====
function loadSubject(){
    let teacher_id = localStorage.getItem("teacher_id");
    let class_id = document.getElementById("class_id").value;

    if(!class_id){
        document.getElementById("subject").innerHTML = "";
        return;
    }

    fetch(`${API}/api/teacher/${teacher_id}/subjects/${class_id}`)
    .then(res => res.json())
    .then(data => {
        let html = "<option value=''>-- Chọn môn --</option>";

        data.forEach(s => {
            html += `<option value="${s}">${s}</option>`;
        });

        document.getElementById("subject").innerHTML = html;
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi load môn!");
    });
}

// ===== CREATE EXAM =====
function create(){

    let teacher_id = localStorage.getItem("teacher_id");
    let class_id = document.getElementById("class_id").value;
    let subject = document.getElementById("subject").value;
    let type = document.getElementById("type").value;
    let exam_date = document.getElementById("exam_date").value;

    // ===== VALIDATE =====
    if(!class_id){
        alert("Chọn lớp!");
        return;
    }

    if(!subject){
        alert("Chọn môn!");
        return;
    }

    if(!exam_date){
        alert("Chọn ngày thi!");
        return;
    }

    fetch(API + "/api/exams/full", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            teacher_id: teacher_id,
            class_id: class_id,
            subject: subject,
            type: type,
            exam_date: exam_date
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.error){
            alert(data.error);
            return;
        }

        alert("Tạo bài thi thành công!");

        // 👉 chuyển sang thêm câu hỏi
        if(data.exam_id){
            window.location.href = "question.html?exam_id=" + data.exam_id;
        }
    })
    .catch(err => {
        console.error(err);
        alert("Lỗi tạo bài thi!");
    });
}

// ===== SIDEBAR NAV =====
function goHome(){ location.href = "teacher.html"; }
function goClass(){ location.href = "teacher_class.html"; }
function goSchedule(){ location.href = "teacher_schedule.html"; }
function goPractice(){ location.href = "practice.html"; }
function goTest(){ location.href = "addtest.html"; }
function goNews(){ location.href = "teacher_new.html"; }
function goGuide(){ location.href = "teacher_new.guide.html"; }

// ===== INIT =====
window.onload = () => {
    loadClass();

    // 👉 khi chọn lớp thì load môn
    document.getElementById("class_id").addEventListener("change", loadSubject);
};
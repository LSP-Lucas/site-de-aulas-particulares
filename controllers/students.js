const fs = require('fs');
const data = require('../data.json');
const { date, grade } = require('../utils');
const Intl = require('intl');

// LIST

exports.index = function(req, res) {

    const students = [...data.students];

    for(student of students) {
        student.birth = date(student.birth).birthDay
    }
   
    return res.render("students/index", { students });
}

// CREATE

exports.create = function(req, res) {

    return res.render("students/create");
}

// POST

exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for(key of keys) {

       if(req.body[key] == "") 
            return res.send("Preencha todos os campos!");
    }

    birth = Date.parse(req.body.birth);

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if(lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        id, 
        ...req.body,
        birth
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("/students");
    });
}


// SHOW

exports.show = function(req, res) {

    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent) return res.send("Aluno não encontrado!");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        year_school: grade(foundStudent.year_school)
    }

    return res.render("students/show", { student });
}

// EDIT

exports.edit = function(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id;
    });

    if(!foundStudent) return res.send("Professor não encontrado!");

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student });
}

// PUT

exports.put = function(req, res) {
    const { id } = req.body;

    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex) {
        if(id == student.id) {
            index = foundIndex;
            return true;
        }
    });

    if(!foundStudent) return res.send("Student not found!");

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect(`/students/${id}`);
    });
}

// DELETE

exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("/students");
    });

}
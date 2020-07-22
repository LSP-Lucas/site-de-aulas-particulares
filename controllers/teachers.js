const fs = require('fs');
const data = require('../data.json');
const { age, date, graduation } = require('../utils');
const Intl = require('intl');


// LIST

exports.index = function(req, res) {

    let teachers = [...data.teachers];
    let list_teachers = [];

    for(const teacher of teachers) {
        teachers = {
            ...teacher,
            services: teacher.services.split(",")
        }
        list_teachers.push(teachers);
    }

    return res.render("teachers/index", { teachers: list_teachers });
}

// CREATE

exports.create = function(req, res) {

    return res.render("teachers/create");
}

// PUT

exports.post = function(req, res) {

    const keys = Object.keys(req.body);

    for(key of keys) {

       if(req.body[key] == "") 
            return res.send("Preencha todos os campos!");
    }

    let { avatar_url, name, birth, grade, modality, services } = req.body;

    birth = Date.parse(birth);
    const create_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        avatar_url, 
        id, 
        name, 
        birth, 
        grade, 
        modality, 
        services, 
        create_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("/teachers");
    });
}


// SHOW

exports.show = function(req, res) {

    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher) return res.send("Professor não encontrado!");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        grade: graduation(foundTeacher.grade),
        create_at: new Intl.DateTimeFormat('pt-br').format(foundTeacher.create_at)
    }

    return res.render("teachers/show", { teacher });
}

// EDIT

exports.edit = function(req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id;
    });

    if(!foundTeacher) return res.send("Professor não encontrado!");

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher });
}

// PUT

exports.put = function(req, res) {
    const { id } = req.body;

    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if(id == teacher.id) {
            index = foundIndex;
            return true;
        }
    });

    if(!foundTeacher) return res.send("Teacher not found!");

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect(`/teachers/${id}`);
    });
}

// DELETE

exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");

        return res.redirect("/teachers");
    });

}
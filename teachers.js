const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils');
const Intl = require('intl');


// CREATE

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
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher });
}
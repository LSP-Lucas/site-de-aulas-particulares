module.exports = {

    age: function(birth) {
        const today = new Date();
        const birthDate = new Date(birth);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if((month < 0 || month == 0) && (today.getDate() <= birthDate.getDate())) {
            age -= 1;
        }

        return age;
    },
    date: function(birth) {
        const date= new Date(birth);

        const year = date.getUTCFullYear();

        const month = `0${date.getUTCMonth() + 1}`.slice(-2);

        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },
    graduation: function(grade) {

        switch(grade) {
            case ('medio'): return 'Ensino Médio Completo'
            case ('superior'): return 'Ensino Superior Completo'
            case ('mestrado'): return 'Mestrado'
            case ('doutorado'): return 'Doutorado'
        }
        
    },
    grade: function(grade) {
        
        switch(grade) {
            case ('5f'): return '5º ano do ensino fundamental'
            case ('6f'): return '6º ano do ensino fundamental'
            case ('7f'): return '7º ano do ensino fundamental'
            case ('8f'): return '8º ano do ensino fundamental'
            case ('1m'): return '1º ano do ensino médio'
            case ('2m'): return '2º ano do ensino médio'
            case ('3m'): return '3º ano do ensino médio'
        }
    }
}
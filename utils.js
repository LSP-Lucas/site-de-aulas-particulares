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

        return `${year}-${month}-${day}`;
    }
}
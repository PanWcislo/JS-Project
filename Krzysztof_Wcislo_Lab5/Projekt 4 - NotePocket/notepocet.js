class Note {
    constructor(title, description, color, attach) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.attach = attach;
        this.createdTime = new Date();
    }
}

let notka = new Note('A', 'B', 'C', false);


console.log(notka);

